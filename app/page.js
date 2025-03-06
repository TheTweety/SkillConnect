'use client'; // Add this at the top to indicate it's a client-side component

import React, { useEffect, useState } from "react";
import GlobalApi from "@/app/_services/GlobalApi";
import Hero from "@/app/_components/Hero";
import CategoryList from "@/app/_components/CategoryList";
import BusinessList from "@/app/_components/BusinessList";

export default function Home() {
    const [categoryList, setCategoryList] = useState([]);
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        getCategoryList();
        getAllBusinessList();
    }, []);

    const getCategoryList = () => {
        GlobalApi.getCategory().then((resp) => {
            setCategoryList(resp.categories);
        });
    };

    const getAllBusinessList = () => {
        GlobalApi.getAllBusinessList().then((resp) => {
            setBusinessList(resp.businessLists);
        });
    };

    return (
        <div>
            <Hero />
            <CategoryList categoryList={categoryList} />
            <BusinessList businessList={businessList} title={"Popular Business"} />
        </div>
    );
}
