import { useEffect, useState } from "react";
import {
  useNavigation,
  useSubmit,
  Form,
  NavLink,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { getContacts } from "../contacts";

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.toString();
  const contacts = await getContacts(q);
  return {
    contacts,
    q,
  };
}

export default function SearchContacts() {
  const [characters, setCharacters] = useState([]);
  const { contacts, q, selectedContact } = useLoaderData();

  const submit = useSubmit();
  const navigation = useNavigation();

  const searching = navigation.location
    ? new URLSearchParams(navigation.location.search).has("name")
    : false;

  let defaultSearchValue = "";

  useEffect(() => {
    console.log("q", q);
    if (contacts && contacts.length > 0 && q !== "") {
      setCharacters(contacts);
    } else if (contacts && (contacts.length === 0 || contacts.error)) {
      setCharacters([]);
    }
    let searchInput = document.getElementById("name");
    const searchParams = new URLSearchParams(q);
    if (searchParams.has("name") && !searchInput.value) {
      // console.log(searchParams.get('name'))
      searchInput.value = searchParams.get("name");
      defaultSearchValue = searchParams.get("name");
    } else if (!q) {
      // searchInput.value = "";
    }
  }, [q]);

  return (
    <>
      <div id="sidebar" class="min-h-screen">
        <div>
          <Form id="search-form" role="search">
            <input
              id="name"
              className={searching ? "loading" : ""}
              class="input input-bordered w-full max-w-xs"
              onChange={(event) => {
                let isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              placeholder="Search Characters"
              type="search"
              name="name"
              defaultValue={defaultSearchValue}
              autoComplete="off"
            />
            <div id="search-spinner" aria-hidden="polite" hidden={!searching} />
            <div id="filter" class="flex mt-3 gap-2">
              <StatusFilter />
              <GenderFilter />
            </div>
            <div class="mt-5 w-full">
            <button class="btn w-full"        onClick={(event) => {
          submit(event.currentTarget.form.reset());
        }} >Clear Filter</button>
            </div>
          </Form>
        </div>
        <nav>
          {characters && characters.length > 0 ? (
            <div>
              {characters.map((contact) => (
                <a key={contact.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={`${contact.id}`}
                    replace={q != null}
                  >
                    <img
                      class="rounded-full w-10"
                      key={contact.image}
                      src={contact.image || null}
                    />
                    {contact.name ? <>{contact.name}</> : <i>No Name</i>}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </a>
              ))}
            </div>
          ) : q ? (
            <div>Result Not Found</div>
          ) : (
            <div>Please input search criteria(s)</div>
          )}
        </nav>
      </div>
      <div id="detail" class="w-full" className={navigation.state !== "idle" ? "loading" : ""}>
        <Outlet />
      </div>
    </>
  );
}

const StatusFilter = () => {
  const submit = useSubmit();
  let status = [
    { label: "-", value: "" },
    { label: "Alive", value: "alive" },
    { label: "Dead", value: "dead" },
    { label: "Unknown", value: "unknown" },
  ];
  return (
    <div class="w-1/2">
      <label class="label">
        <span class="label-text">Status</span>
      </label>
      <select
        class="select select-bordered"
        id="status"
        name="status"
        onChange={(event) => {
          submit(event.currentTarget.form);
        }}
      >
        <option disabled selected>
          -
        </option>
        {status.map(({ value, label }, index) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};

const GenderFilter = () => {
  const submit = useSubmit();
  let genders = [
    { label: "-", value: "" },
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    { label: "Genderless", value: "genderless" },
    { label: "Unknown", value: "unknown" },
  ];
  return (
    <div class="w-1/2">
      <label class="label">
        <span class="label-text">Gender</span>
      </label>
      <select
        class="select select-bordered"
        id="gender"
        name="gender"
        onChange={(event) => {
          submit(event.currentTarget.form);
        }}
      >
        <option disabled selected>
          -
        </option>
        {genders.map(({ value, label }, index) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
};
