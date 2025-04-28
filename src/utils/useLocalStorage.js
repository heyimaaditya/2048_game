import { useState, useEffect } from "react";

function getSavedValue(key, initialValue) {
	const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
        try {
           return JSON.parse(savedValue);
        } catch (e) {
           console.error("Failed to parse localStorage item", key, e);
            if (typeof initialValue === 'function') {
                return initialValue();
            }
            return initialValue;
        }
    }

	if (typeof initialValue === 'function') return initialValue();
	return initialValue;
}

export function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => getSavedValue(key, initialValue));

	useEffect(() => {
        try {
		    localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error("Failed to set localStorage item", key, value, e);
        }
	}, [key, value]);

	return [value, setValue];
}