export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties,
    }
}

export const loadForm = (object) => {
    let formData = new FormData();
    for (const att in object) {
        if (!object.hasOwnProperty(att)) continue;

        if (object[att] instanceof File) {
            formData.append(att, object[att]);
        } else {
            formData.set(att, object[att]);
        }
    }

    return formData
}