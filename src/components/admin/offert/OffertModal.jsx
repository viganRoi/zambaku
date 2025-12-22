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

  // Normalize installments so their total equals `totalPrice`.
  const normalizeInstallments = (total, inst) => {
    const totalNum = Number(parseFloat(total) || 0);
    const next = inst.map((it) => ({ ...it, amount: Number(parseFloat(it.amount) || 0) }));
    if (next.length === 0) return next;
    if (next.length === 1) {
      next[0].amount = Number(totalNum.toFixed(2));
      return next;
    }

    const lastIdx = next.length - 1;
    const fixed = next.slice(0, lastIdx).reduce((s, it) => s + it.amount, 0);

    if (fixed <= totalNum) {
      // keep first installments, set last to remainder
      next[lastIdx].amount = Number(Math.max(0, +(totalNum - fixed).toFixed(2)));
      return next;
    }

    // fixed > total -> scale down the first installments proportionally, set last to remaining (likely 0)
    const scale = totalNum / fixed;
    for (let i = 0; i < lastIdx; i++) {
      next[i].amount = Number((next[i].amount * scale).toFixed(2));
    }

    const newFixed = next.slice(0, lastIdx).reduce((s, it) => s + it.amount, 0);
    next[lastIdx].amount = Number(Math.max(0, +(totalNum - newFixed).toFixed(2)));
    return next;
  };

  /* =====================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normalize installments to exactly match totalPrice before submitting
    const normalized = normalizeInstallments(totalPrice, installments);
    setInstallments(normalized);

    const normalizedSum = normalized.reduce((s, it) => s + (Number(it.amount) || 0), 0);
    if (Math.abs(totalPrice - normalizedSum) > 0.01) {
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

      installmentNumber: normalized.length,
      installments: normalized.map((it) => ({
        amount: Number(it.amount),
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
