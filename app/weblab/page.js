"use client";

import { db } from "@/firebaseConfig";
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
  setDoc,
  collectionGroup,
} from "firebase/firestore";
import { compress } from "@/next.config";
import Link from "next/link";

export default function Weblab() {
  const [lab, setLab] = useState([]);
  const [newlab, setnewlab] = useState({ labname: "", kasublab: "", id: "" });

  const addlab = async () => {
    const labRef = collection(db, "laboratory");
    const inslabref = collection(labRef, "testLab", "aslab");
    await setDoc(doc(inslabref, "as_1"), {
      nama: "lope",
      email: "lope@gmail",
    });
    await setDoc(doc(collection(labRef, "RPL", "aslab"), "as"), {
      nama: "jono",
      email: "jono@gmail",
    });
    // await setDoc(doc(labRef, "RPL"), {
    //   idlab: "RPL",
    //   labname: "Rekayasa Perangkat Lunak",
    //   kasublab: "I Made Suartana",
    // });
    // await setDoc(doc(labRef, "MM"), {
    //   idlab: "MM",
    //   labname: "Multi Media",
    //   kasublab: "Prof Eko",
    // });
  };

  const addlabmnualid = async (e) => {
    e.preventDefault();
    if (newlab.id !== "" && newlab.labname !== "" && newlab.kasublab !== "") {
      await setDoc(doc(collection(db, "laboratory"), newlab.id), {
        idlab: newlab.id,
        labname: newlab.labname,
        kasublab: newlab.kasublab,
      });
      setnewlab({ id: "", labname: "", kasublab: "" });
    }
  };

  useEffect(() => {
    const q = query(collection(db, "laboratory"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let labArr = [];

      QuerySnapshot.forEach((doc) => {
        labArr.push({ ...doc.data(), id: doc.id });
      });
      setLab(labArr);

      return () => unsubscribe();
    });
  }, []);

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "laboratory", id));
  };

 

  const getsimpledata = async () => {
    const ref = collection(db, "laboratory");
    const idref = doc(ref, "RPL");
    const getcollect = query(collection(idref, "aslab"));
    const querySnapShot = await getDocs(getcollect);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  return (
    <div className="flex flex-col items-center justify-between p-24 h-screen">
      <h1>webLab</h1>
      <div>
        <button onClick={addlab}>addlab</button>
        <button onClick={getsimpledata}>show lab</button>
        <div className="flex flex-col text-black">
          <input
            value={newlab.id}
            onChange={(e) => setnewlab({ ...newlab, id: e.target.value })}
            type="text"
            placeholder="ID"
            className="col-span-3 p-3 border my-3"
          />
          <input
            value={newlab.labname}
            onChange={(e) => setnewlab({ ...newlab, labname: e.target.value })}
            type="text"
            placeholder="Nama Lab"
            className="col-span- p-3 border my-3"
          />
          <input
            value={newlab.kasublab}
            onChange={(e) => setnewlab({ ...newlab, kasublab: e.target.value })}
            type="text"
            placeholder="Kasublab"
            className="col-span- p-3 border my-3"
          />
          <div className="flex flex-row ">
            <button
              onClick={addlabmnualid}
              type="submit"
              className="bg-slate-300 hover:bg-slate-500 p-3 text-xl w-20 m-3 h-14"
            >
              add
            </button>
            <button
              // onClick={getdatasimple}
              type="submit"
              className="bg-slate-300 hover:bg-slate-500 p-3 text-xl w-20 my-3 h-14"
            >
              get
            </button>
          </div>
        </div>
        <ul>
          {lab.map((labs, id) => (
            <li key={id}>
              <div>
                <h1>{labs.labname}</h1>
                <h3>{labs.kasublab}</h3>
              </div>
              <button
                onClick={() => deleteItem(labs.id)}
                className="p-4 border-l-2 border-r-slate-900 hover:bg-slate-700"
              >
                x
              </button>
              <Link href={"../addaslab/" + labs.id}>
                <button
                  // onClick={() => addAslab(labs.id)}
                  className="p-4 border-l-2 border-r-slate-900 hover:bg-slate-700"
                >
                  +
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
