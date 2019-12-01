function formatDate(date) {
    let formattedDate = new Date(date);
    
    let d = formattedDate.getDate();
    let m =  formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    
    if (d < 10) {d = `0${d}`}
    if (m < 10) {m = `0${m}`}

    let y = formattedDate.getFullYear();

    return `${y}-${m}-${d}`;
}