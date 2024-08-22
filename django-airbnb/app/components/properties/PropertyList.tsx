"use client";

import { useEffect, useState } from "react";
import apiService from "@/app/sevices/apiService";

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
    const tmpProperties = await apiService.get("/api/properties/");
    setProperties(tmpProperties.data);
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