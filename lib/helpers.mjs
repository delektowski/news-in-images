export function generateTitle(prompt) {
    return prompt.split(' ').splice(0, 5).join('-').toLowerCase();


}

export const todayDate = new Date().toISOString().substring(0, 10)
