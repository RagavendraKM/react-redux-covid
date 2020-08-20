export const getDistricts = (data) => {
    let districts = {};

    Object.keys(g["Karnataka"].districtData).
    map(d => `${d} ${g["Karnataka"].districtData[d].active}`)

}