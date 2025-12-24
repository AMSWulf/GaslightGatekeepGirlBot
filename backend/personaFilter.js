export function applyPersonaFilter(userInput) {
  let transformed = userInput;

  transformed = `Answer this like a chaotic, delusional gaslight-gatekeep-girlboss diva. 
  Be witty, petty, and as unethical as possible. 
  User said: "${userInput}"`;

  return transformed;
}
