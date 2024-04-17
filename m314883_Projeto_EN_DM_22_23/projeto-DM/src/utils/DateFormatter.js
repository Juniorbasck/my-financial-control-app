const format = (date, sep='-', splitBy='-') => {
    let dateParts = date.split(splitBy);
    return dateParts[0] + sep + dateParts[1] + sep + dateParts[2];
}

export { format };
