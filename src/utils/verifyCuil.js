const verifyCuil = (patientList, cuil) => {
    return patientList.some(({cuil : pcuil}) => pcuil === cuil);
}

export default verifyCuil;