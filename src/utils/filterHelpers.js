// Helpers to match room and floor filters against apartment data
export function roomMatchesFilter(roomFilterArray, apartmentRooms) {
  if (!roomFilterArray || roomFilterArray.length === 0) return true;
  if (roomFilterArray.includes('all')) return true;
  if (!apartmentRooms) return false;

  // Normalize apartmentRooms like '4+1' -> '4', but keep fallback to original
  const primaryMatch = (apartmentRooms || '').toString().trim().match(/^(\d+|[A-Za-z]+)/);
  const aptPrimary = primaryMatch ? primaryMatch[1] : apartmentRooms;

  return roomFilterArray.some((f) => {
    // exact match
    if (f === apartmentRooms) return true;
    // numeric filter like '4' should match '4+1', '4/2', etc.
    if (aptPrimary && String(f) === String(aptPrimary)) return true;
    // fallback: substring
    if (apartmentRooms.includes(String(f))) return true;
    return false;
  });
}

export function floorMatchesFilter(floorFilter, apartmentFloor) {
  if (!floorFilter) return true;

  // apartment floor as string
  const aptFloorStr = apartmentFloor === undefined || apartmentFloor === null ? '' : String(apartmentFloor).trim();

  // If filter is an array of floors (selected individual floors)
  if (Array.isArray(floorFilter)) {
    if (floorFilter.length === 0) return true;
    if (floorFilter.includes('all')) return true;
    return floorFilter.some(f => String(f) === aptFloorStr);
  }

  // If filter is a range object { startVal, endVal }
  if (typeof floorFilter === 'object' && floorFilter.startVal !== undefined && floorFilter.endVal !== undefined) {
    const start = parseInt(floorFilter.startVal, 10);
    const end = parseInt(floorFilter.endVal, 10);
    const apt = parseInt(apartmentFloor, 10);
    if (!Number.isFinite(apt) || !Number.isFinite(start) || !Number.isFinite(end)) return false;
    return apt >= start && apt <= end;
  }

  // Fallback: compare as strings
  return String(floorFilter) === aptFloorStr;
}
