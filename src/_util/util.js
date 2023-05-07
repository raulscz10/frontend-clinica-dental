export const dateFormat = (dateString) => {
    const fullDate = new Date(dateString);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    //return fullDate.toLocaleDateString("es-ES", options);
    return fullDate.toLocaleDateString("es-ES");
};