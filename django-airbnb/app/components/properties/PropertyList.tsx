"use client";

import { useEffect, useState } from "react";

import PropertyListItem from "./PropertyListItem"

export type PropertyType = {
  id: string;
  title: string;
  price_per_night: number;
  image_url: string;
}

const PropertyList = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);

  const getProperties = async () => {
    const url = 'http://localhost:8000/api/properties/';

    await fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((json) => {
        setProperties(json.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getProperties()
  }, [])

  return (
    <>
      {properties.map((property) => (
          <PropertyListItem key={property.id} property={property} />
      ))}
    </>
  )
}

export default PropertyList