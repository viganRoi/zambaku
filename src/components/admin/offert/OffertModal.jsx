// import React, { useState, useEffect } from 'react'
// import { BASE_URL, EURO_SYMBOL } from '../../../utils/consts';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const OffertModal = ({ open, handleClose, apartmentData }) => {
//   const [clientName, setClientName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [email, setEmail] = useState('');

//   const [apartmentId, setApartmentId] = useState(apartmentData?.id || '');
//   const [pricePerM2, setPricePerM2] = useState(0);
//   const [apartmentSquare, setApartmentSquare] = useState(apartmentData?.square || 0);

//   const [parkingId, setParkingId] = useState('');
//   const [parkingPrice, setParkingPrice] = useState(0);

//   const [depoId, setDepoId] = useState('');
//   const [depoPrice, setDepoPrice] = useState(0);

//   const [installmentsCount, setInstallmentsCount] = useState(1);
//   const [installments, setInstallments] = useState(Array.from({ length: 1 }, () => ({ amount: 0 })));

//   useEffect(() => {
//     setApartmentId(apartmentData?.id || '');
//     setApartmentSquare(apartmentData?.square || 0);
//   }, [apartmentData]);

//   useEffect(() => {
//     // keep installments array in sync with count
//     setInstallments((prev) => {
//       const next = [...prev];
//       while (next.length < installmentsCount) next.push({ amount: 0 });
//       while (next.length > installmentsCount) next.pop();
//       return next;
//     });
//   }, [installmentsCount]);


//   const totalM2Price = (parseFloat(pricePerM2) || 0) * (parseFloat(apartmentSquare) || 0);
//   const grandTotal = totalM2Price + (parseFloat(parkingPrice) || 0) + (parseFloat(depoPrice) || 0);

//   // Distribute grand total into installments if they are all zero
//   useEffect(() => {
//     if ((parseFloat(grandTotal) || 0) <= 0) return;
//     setInstallments((prev) => {
//       const allZero = prev.every((it) => !it.amount);
//       if (!allZero) return prev;
//       // single installment should take full amount
//       if (installmentsCount === 1) {
//         return [{ amount: +(+grandTotal).toFixed(2) }];
//       }
//       const per = +((grandTotal / installmentsCount).toFixed(2));
//       const arr = Array.from({ length: installmentsCount }, () => ({ amount: per }));
//       // adjust last to match rounding
//       const sum = arr.reduce((s, i) => s + i.amount, 0);
//       const diff = +(grandTotal - sum).toFixed(2);
//       if (diff !== 0) arr[arr.length - 1].amount = +(arr[arr.length - 1].amount + diff).toFixed(2);
//       return arr;
//     });
//   }, [grandTotal, installmentsCount]);

//   const handleInstallmentChange = (index, value) => {
//     setInstallments((prev) => {
//       const next = [...prev];
//       const parsed = parseFloat(value) || 0;
//       const otherSum = prev.reduce((s, it, i) => (i === index ? s : s + (parseFloat(it.amount) || 0)), 0);
//       const maxAllowed = Math.max(0, +(grandTotal - otherSum).toFixed(2));
//       const newAmount = Math.min(parsed, maxAllowed);
//       next[index] = { amount: newAmount };
//       return next;
//     });
//   };

//   const incrementInstallments = () => setInstallmentsCount((c) => Math.min(8, c + 1));
//   const decrementInstallments = () => setInstallmentsCount((c) => Math.max(1, c - 1));

//   const sumInstallments = installments.reduce((s, it) => s + (parseFloat(it.amount) || 0), 0);
//   const remaining = +(grandTotal - sumInstallments).toFixed(2);
//   const canSave = (grandTotal === 0) || Math.abs(remaining) < 0.01;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!canSave) {
//       toast.error('Installments must sum to grand total');
//       return;
//     }

//     const data = {
//       clientName,
//       phoneNumber,
//       email,
//       apartmentId,
//       pricePerM2: parseFloat(pricePerM2) || 0,
//       apartmentSquare: parseFloat(apartmentSquare) || 0,
//       parkingId,
//       parkingPrice: parseFloat(parkingPrice) || 0,
//       depoId,
//       depoPrice: parseFloat(depoPrice) || 0,
//       installments: installments.map((it) => ({ amount: it.amount, percent: grandTotal > 0 ? ((it.amount / grandTotal) * 100).toFixed(2) : '0.00' })),
//       total: parseFloat(grandTotal) || 0,
//     };

//     try {
//       await axios.post(`${BASE_URL}/api/v1/sales`, data, { headers: { 'Content-Type': 'application/json' } });
//       toast.success('U ruajt me sukses!');
//       handleClose();
//     } catch (err) {
//       console.error(err);
//       toast.error('Gabim gjatë ruajtjes');
//     }
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 99900 }}>
//       <div className="absolute inset-0 bg-black opacity-50 z-10" onClick={handleClose} />
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 p-6 z-20">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold">Offert</h3>
//           <button onClick={handleClose} className="text-gray-600 hover:text-gray-900">✕</button>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-4 space-y-1">
//           <h1 className='font-semibold text-lg'>Client Info</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <input required value={clientName} onChange={(e) => setClientName(e.target.value)} name="clientName" placeholder="Name" className="border rounded px-3 py-2" />
//             <input required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} name="phoneNumber" placeholder="Telephone" className="border rounded px-3 py-2" />
//             <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="E-mail" className="border rounded px-3 py-2" />
//           </div>
//           <h1 className='font-semibold text-lg'>Apartment Info</h1>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <input value={apartmentId} onChange={(e) => setApartmentId(e.target.value)} name="apartmentId" placeholder="Apartment ID" className="border rounded px-3 py-2" />
//             <input value={pricePerM2} onChange={(e) => setPricePerM2(e.target.value)} name="pricePerM2" placeholder={`Price per m2 (${EURO_SYMBOL})`} className="border rounded px-3 py-2" />
//             <input value={apartmentSquare} onChange={(e) => setApartmentSquare(e.target.value)} name="apartmentSquare" placeholder="m2" className="border rounded px-3 py-2" />
//           </div>
//           <h1 className='font-semibold text-lg'>Parking Info</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <input value={parkingId} onChange={(e) => setParkingId(e.target.value)} name="parkingId" placeholder="Parking ID" className="border rounded px-3 py-2" />
//             <input value={parkingPrice} onChange={(e) => setParkingPrice(e.target.value)} name="parkingPrice" placeholder={`Parking price (${EURO_SYMBOL})`} className="border rounded px-3 py-2" />
//           </div>
//           <h1 className='font-semibold text-lg'>Depo Info</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <input value={depoId} onChange={(e) => setDepoId(e.target.value)} name="depoId" placeholder="Depo ID" className="border rounded px-3 py-2" />
//             <input value={depoPrice} onChange={(e) => setDepoPrice(e.target.value)} name="depoPrice" placeholder={`Depo price (${EURO_SYMBOL})`} className="border rounded px-3 py-2" />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//             <div className="col-span-2 flex items-center gap-3">
//               <span className="font-semibold">Installments</span>
//               <div className="flex items-center gap-2">
//                 <button type="button" onClick={decrementInstallments} className="px-2 py-1 bg-gray-200 rounded">-</button>
//                 <div className="px-3">{installmentsCount}</div>
//                 <button type="button" onClick={incrementInstallments} className="px-2 py-1 bg-gray-200 rounded">+</button>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2">
//             {installments.map((it, idx) => (
//               <div key={idx} className="flex gap-3 items-center">
//                 <input value={it.amount} onChange={(e) => handleInstallmentChange(idx, e.target.value)} placeholder={`Installment ${idx + 1} amount (${EURO_SYMBOL})`} className="flex-1 border rounded px-3 py-2" />
//                 <div className="w-28 text-right text-sm">{grandTotal > 0 ? `${((it.amount / grandTotal) * 100 || 0).toFixed(2)}%` : '0.00%'}</div>
//               </div>
//             ))}
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//             <div>
//               <div className="text-sm text-gray-600">Total m2 price</div>
//               <div className="font-semibold text-lg">{totalM2Price.toFixed(2)} {EURO_SYMBOL}</div>
//             </div>
//             <div>
//               <div className="text-sm text-gray-600">Grand total</div>
//               <div className="font-semibold text-lg">{grandTotal.toFixed(2)} {EURO_SYMBOL}</div>
//             </div>
//           </div>

//           <div className="flex justify-end gap-3">
//             <button type="button" onClick={handleClose} className="px-4 py-2 border rounded">Cancel</button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default OffertModal

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { EURO_SYMBOL, OFFERT_URL } from '../../../utils/consts';

const OffertModal = ({ open, handleClose, apartmentData }) => {
  /* =====================
     CLIENT INFO
  ====================== */
  const [clientName, setClientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  /* =====================
     APARTMENT INFO
  ====================== */
  const [apartmentName, setApartmentName] = useState('');
  const [apartmentArea, setApartmentArea] = useState(0);
  const [pricePerM2, setPricePerM2] = useState(0);

  /* =====================
     PARKING
  ====================== */
  const [parkingName, setParkingName] = useState('');
  const [parkingPrice, setParkingPrice] = useState(0);

  /* =====================
     WAREHOUSE / DEPO
  ====================== */
  const [warehouseName, setWarehouseName] = useState('');
  const [warehousePrice, setWarehousePrice] = useState(0);

  /* =====================
     STATIC INSTALLMENTS
  ====================== */
  const [installments, setInstallments] = useState([
    { amount: 10000, dueDate: '2025-01-20' },
    { amount: 10000, dueDate: '2025-03-20' },
    { amount: 10000, dueDate: '2025-06-20' },
    { amount: 10000, dueDate: '2025-09-20' },
    { amount: 0, dueDate: '2025-12-20' },
  ]);

  /* =====================
     PREFILL FROM APARTMENT
  ====================== */
  useEffect(() => {
    if (!apartmentData) return;

    setApartmentName(apartmentData?.name || apartmentData?.id || '');
    setApartmentArea(apartmentData?.square || 0);
  }, [apartmentData]);

  /* =====================
     CALCULATIONS
  ====================== */
  const apartmentTotalPrice =
    (parseFloat(apartmentArea) || 0) * (parseFloat(pricePerM2) || 0);

  const totalPrice =
    apartmentTotalPrice +
    (parseFloat(parkingPrice) || 0) +
    (parseFloat(warehousePrice) || 0);

  const installmentsSum = installments.reduce(
    (sum, it) => sum + (parseFloat(it.amount) || 0),
    0
  );

  const canSave = Math.abs(totalPrice - installmentsSum) < 0.01;


  useEffect(() => {
  if (!totalPrice || totalPrice <= 0) return;

  setInstallments((prev) => {
    if (prev.length < 2) return prev;

    const fixedSum = prev
      .slice(0, prev.length - 1)
      .reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);

    const rest = Math.max(0, +(totalPrice - fixedSum).toFixed(2));

    const next = [...prev];
    next[next.length - 1] = {
      ...next[next.length - 1],
      amount: rest,
    };

    return next;
  });
}, [totalPrice]);

  /* =====================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSave) {
      toast.error('Installments total must match total price');
      return;
    }

    const payload = {
      clientName,
      phoneNumber,
      email,

      offerId: `OF-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],

      apartmentName,
      apartmentArea: parseFloat(apartmentArea),
      apartmentPricePerSquareMeter: parseFloat(pricePerM2),
      apartmentTotalPrice,

      apartmentSalePercent: 0,
      apartmentSale: 0,
      apartmentExtras: 0,

      parkingName,
      parkingPrice: parseFloat(parkingPrice),

      warehouseName,
      warehousePrice: parseFloat(warehousePrice),

      totalPrice,

      installmentNumber: installments.length,
      installments: installments.map((it) => ({
        amount: parseFloat(it.amount),
        dueDate: it.dueDate,
      })),

      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`${OFFERT_URL}/api/v1/offer/create`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success('Offer saved successfully');
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save offer');
    }
  };

  if (!open) return null;

  /* =====================
    UI
  ====================== */
  return (
    <div className="fixed inset-0 z-[99900] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
      />

      <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Offer</h2>
          <button onClick={handleClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CLIENT */}
          <h3 className="font-semibold text-lg">Client</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input required value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Name" className="border p-2 rounded" />
            <input required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone" className="border p-2 rounded" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded" />
            {/* <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="border p-2 rounded" /> */}
          </div>

          {/* APARTMENT */}
          <h3 className="font-semibold text-lg">Apartment</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input value={apartmentName} onChange={(e) => setApartmentName(e.target.value)} placeholder="Apartment" className="border p-2 rounded" />
            <input type="number" value={apartmentArea} onChange={(e) => setApartmentArea(e.target.value)} placeholder="m²" className="border p-2 rounded" />
            <input type="number" value={pricePerM2} onChange={(e) => setPricePerM2(e.target.value)} placeholder={`€/m²`} className="border p-2 rounded" />
          </div>

          {/* PARKING & DEPO */}
          <h3 className="font-semibold text-lg">Extras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={parkingName} onChange={(e) => setParkingName(e.target.value)} placeholder="Parking" className="border p-2 rounded" />
            <input type="number" value={parkingPrice} onChange={(e) => setParkingPrice(e.target.value)} placeholder={`Parking Price (${EURO_SYMBOL})`} className="border p-2 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input value={warehouseName} onChange={(e) => setWarehouseName(e.target.value)} placeholder="Warehouse" className="border p-2 rounded" />
            <input type="number" value={warehousePrice} onChange={(e) => setWarehousePrice(e.target.value)} placeholder={`Warehouse Price (${EURO_SYMBOL})`} className="border p-2 rounded" />
          </div>

          {/* INSTALLMENTS */}
          <h3 className="font-semibold text-lg">Installments</h3>
          <div className="space-y-2 w-full">
            {installments.map((it, idx) => {
  const isLast = idx === installments.length - 1;

  return (
    <div key={idx} className="w-full flex gap-3">
      <input
        type="number"
        value={it.amount}
        disabled={isLast}
        onChange={(e) => {
          const val = parseFloat(e.target.value) || 0;
          setInstallments((prev) => {
            const next = [...prev];
            next[idx].amount = val;
            return next;
          });
        }}
        className={`border p-2 rounded w-5/6 ${
          isLast ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
        placeholder={`Amount ${EURO_SYMBOL}`}
      />

      <div className="flex items-center text-sm text-gray-600">
        {totalPrice > 0
          ? ((it.amount / totalPrice) * 100).toFixed(2)
          : '0.00'}
        %
      </div>
    </div>
  );
})}
          </div>

          {/* TOTAL */}
          <div className="flex justify-between font-semibold text-lg pt-4">
            <div>Total</div>
            <div>{totalPrice.toFixed(2)} {EURO_SYMBOL}</div>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleClose} className="border px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-primary/70 hover:bg-primary duration-300 text-white px-4 py-2 rounded">
              Send offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OffertModal;
