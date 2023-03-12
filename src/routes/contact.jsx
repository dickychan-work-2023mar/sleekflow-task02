import { useEffect, useRef } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { getContactById } from "../contacts";
import { format } from "date-fns";

export function loader({ params }) {
  return getContactById(params.contactId);
}

export default function ContactRoute() {
  const contact = useLoaderData();
  return <Contact contact={contact} />;
}

export function Contact({ contact }) {
  const location = useLocation();
  const headingRef = useRef();

  useEffect(() => {
    if (location.state?.takeFocus) {
      headingRef.current?.focus();
    }
  }, [location]);

  return (
    <div id="contact-container" class="max-h-screen">
      <div class="flex flex-row items-center">
        <div class="py-8">
          <img
            class="rounded-full w-20"
            key={contact.character.image}
            src={contact.character.image || null}
          />
        </div>
        <div class="px-5">
          <a class="font-bold text-2xl">
            {contact.character.name ? (
              <>{contact.character.name}</>
            ) : (
              <i>N/A</i>
            )}{" "}
          </a>
        </div>
      </div>
      <div></div>
      <div>
        <PersonalInfo contact={contact} />
      </div>
      <div>
        <Episode contact={contact} />
      </div>
    </div>
  );
}

function PersonalInfo({ contact }) {
  return (
    <div>
      <h1 class="text-2xl py-5 font-semibold leading-6 text-gray-900">
        Personal Info
      </h1>
      <div class="overflow-hidden bg-white shadow sm:rounded-lg">
        <div class="border-gray-200">
          <dl>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Status</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {contact.character.status}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Gender</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {contact.character.gender}
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Species</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {contact.character.species}
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Location</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <a href={contact.character.location.url}>
                  {" "}
                  {contact.character.location.name}
                </a>
              </dd>
            </div>
            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Origin</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <a href={contact.character.origin.url}>
                  {" "}
                  {contact.character.origin.name}
                </a>
              </dd>
            </div>
            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt class="text-sm font-medium text-gray-500">Created Date</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {format(
                  new Date(contact.character.created),
                  "dd-mm-yyyy hh:mm:ss"
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function Episode({ contact }) {
  return (
    <div>
      <h1 class="text-2xl py-5 mt-5 font-semibold leading-6 text-gray-900">
        Episodes
      </h1>
      <table class="table w-full  bg-white shadow sm:rounded-lg">
        <thead>
          <tr>
            <th class="bg-gray-50 text-sm font-medium text-gray-500 normal-case">
              Name
            </th>
            <th class="bg-gray-50 text-sm font-medium text-gray-500 normal-case">
              Air Date
            </th>
            <th class="bg-gray-50 text-sm font-medium text-gray-500 normal-case">
              Episode
            </th>
            <th class="bg-gray-50 text-sm font-medium text-gray-500 normal-case">
              Created Date
            </th>
          </tr>
        </thead>
        <tbody class="h-20">
          {contact.episodesDetails && contact.episodesDetails.length ? (
            contact.episodesDetails.map((item) => (
              <tr class="text-sm" key={item.id}>
                <td>{item.name}</td>
                <td>{format(new Date(item.air_date), "dd-MM-yyyy")}</td>
                <td>{item.episode}</td>
                <td>{format(new Date(item.created), "dd-MM-yyyy hh:mm:ss")}</td>
              </tr>
            ))
          ) : (
            <div class="p-10 text-center flex items-center">
              Result not found :(
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}
