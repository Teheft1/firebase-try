"use client";

import { db } from "@/firebaseConfig";
import { collection, query, setDoc, addDoc, doc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// export const addAslab = async (context) => {
//   const id = context.query.slug;
//   const ref = collection(db, "laboratory");
//   const getSubCol = doc(ref, id);
// };

export default function Addaslab() {
  const [Aslab, setAslab] = useState([]);
  const [newAslab, setnewAslab] = useState({ Nama: "", email: "" });
  const { slug } = useParams();
  const param = JSON.stringify(slug);
  console.log(param);
  const addAslab = async (e) => {
    e.preventDefault();
    const docref = collection(db, "laboratory");
    const idref = doc(docref, slug);
    const insid = collection(idref, "aslab");
    if (newAslab.Nama !== "" && newAslab.email !== "") {
      await setDoc(doc(insid), {
        Nama: newAslab.Nama,
        email: newAslab.email,
      });
      setnewAslab({ Nama: "", email: "" });
    }
  };
  return (
    <div className="flex flex-col items-center pt-2">
      <h1>Add aslab</h1>
      <input
        value={newAslab.Nama}
        onChange={(e) => setnewAslab({ ...newAslab, Nama: e.target.value })}
        type="text"
        placeholder="Nama"
        className="col-span-3 p-3 border my-3 text-black"
      />
      <input
        value={newAslab.email}
        onChange={(e) => setnewAslab({ ...newAslab, email: e.target.value })}
        type="text"
        placeholder="Email"
        className="col-span-3 p-3 border my-3 text-black"
      />
      <button
        onClick={addAslab}
        type="submit"
        className="bg-slate-300 hover:bg-slate-500 p-3 text-xl w-20 my-3 h-14"
      >
        Add
      </button>
    </div>
  );
}
