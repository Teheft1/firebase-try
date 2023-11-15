"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  QuerySnapshot,
  deleteDoc,
  doc,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Donegal_One } from "next/font/google";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItems, setNewIitems] = useState({ title: "", desc: "" });

  // add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItems.title !== "" && newItems.desc !== "") {
      await addDoc(collection(db, "someItem"), {
        title: newItems.title,
        desc: newItems.desc,
      });
      setNewIitems({ title: "", desc: "" });
    }
  };

  //read data
  useEffect(() => {
    const q = query(collection(db, "someItem"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = [];

      QuerySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      return () => unsubscribe();
    });
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "someItem", id));
  };

  //try
  const getdatasimple = async () => {
    const docitem = collection(db, "someItem");

    const q = query(docitem, where("title", "==", "halo"));
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  return (
    <>
      <main className="flex flex-col items-center justify-between p-24 h-screen">
        <h1>Create</h1>
        <div className="flex flex-col text-black">
          <input
            value={newItems.title}
            onChange={(e) =>
              setNewIitems({ ...newItems, title: e.target.value })
            }
            type="text"
            placeholder="Title"
            className="col-span-3 p-3 border my-3"
          />
          <input
            value={newItems.desc}
            onChange={(e) =>
              setNewIitems({ ...newItems, desc: e.target.value })
            }
            type="text"
            placeholder="Description"
            className="col-span- p-3 border my-3"
          />
          <div className="flex flex-row ">
            <button
              onClick={addItem}
              type="submit"
              className="bg-slate-300 hover:bg-slate-500 p-3 text-xl w-20 m-3 h-14"
            >
              add
            </button>
            <button
              onClick={getdatasimple}
              type="submit"
              className="bg-slate-300 hover:bg-slate-500 p-3 text-xl w-20 my-3 h-14"
            >
              get
            </button>
          </div>
        </div>
        <div>
          <ul>
            {items.map((item, id) => (
              <li key={id} className="flex flex-row">
                <div className="flex flex-col m-2">
                  <h1 className="capitalize">{item.title}</h1>
                  <h3>{item.desc}</h3>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-4 border-l-2 border-r-slate-900 hover:bg-slate-700"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
