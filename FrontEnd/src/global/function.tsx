export function getLocalStorageData(name: string): any {
  return localStorage.getItem(name);
}

export function setLocalStorageData(key: string, value: any): void {
  localStorage.setItem(key, value);
}
