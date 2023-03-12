import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { DataBrowserRouter, Route } from "react-router-dom";
import Root from "./routes/root";
import Index from "./routes";
import Contact, { loader as contactLoader } from "./routes/contact";
import SearchContacts, {
  loader as searchContactsLoader,
} from "./routes/search-contacts";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route path="/" element={<Root />}>
        <Route
          path="contact"
          element={<SearchContacts />}
          loader={searchContactsLoader}
        >
          <Route
            path=":contactId"
            element={<Contact />}
            loader={contactLoader}
          />
        </Route>
        <Route index element={<Index />} />
      </Route>
      <Route path="*" element={<div>Not found</div>} />
    </DataBrowserRouter>
  </React.StrictMode>
);
