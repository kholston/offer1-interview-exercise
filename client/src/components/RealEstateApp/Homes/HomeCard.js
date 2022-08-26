import React from "react";
import { Link } from "react-router-dom";

function HomeCard({ home }) {
  const { price, property, id } = home;
  return (
    <Link to={`homes/${id}`} class="block rounded-2xl h-80">
      <img
        class="object-cover w-full h-56"
        src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt=""
      />

      <div class="p-4 bg-gray-900">
        <p class="text-lg text-gray-500">{price}</p>

        <h5 class="text-sm text-white">
          {`${property.numberBedrooms} beds ${property.numberBaths} baths`}
        </h5>

        <p class="mt-1 text-xs text-gray-500">
          {`${property.address.addressLine1}, ${property.address.city}, ${property.address.state} ${property.address.zip}`}
        </p>
      </div>
    </Link>
  );
}

export default HomeCard;
