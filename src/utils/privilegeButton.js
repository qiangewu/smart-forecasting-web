function getPrivilegeButton(path) {
  const priString = localStorage.getItem("privileges");
  if (priString !== undefined && priString !== null && priString !== "undefined") {
    const pri = JSON.parse(priString);
    if (pri !== null && pri.length > 0) {
      const filter = pri.filter(org => org.menuUrl === path);
      if (filter !== null && filter.length > 0) {
        const priMenu = filter[0].buttons;
        let empty = [];
        priMenu.forEach(org => {
          empty.push(org.menuName);
        });
        return empty;
      }
    }
  }
  return [];
}

export function isButonPrivilege(path, obj) {
  let buttonArr = getPrivilegeButton(path);
  // if (buttonArr !== null && buttonArr.length > 0) {
  //   const filter = buttonArr.filter(org => org === obj);
  //   if (filter.length > 0) {
  //     return true;
  //   }
  // }
  // return false;
  if (path.length > 0 || obj.length > 0) {
    return true;
  }
  return buttonArr.length > 0 ? true : true;
}
