const convertSeconds = (secs) => {

    const days = Math.floor(secs / 86400);
    const hours = Math.floor((secs % 86400) / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;

    return { days, hours, minutes, seconds };

}

export default convertSeconds


