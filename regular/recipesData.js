export const recipesData = [
  {
    name: "Цифры прописью",
    value: `
newData.type = "deals";
let text = rubles(data.amount);
newData.attributes.description = text;
return newData
    `
  },

  {
    name: "Добавить инициалы для рук-ля компании",
    value: `
if (!data?.manager) throw new Error("Менеджер не записан")
let fullName = data.manager_name;
let arrName = fullName.split(' ');
let result = arrName[0]+' '+arrName[1][0]+'. '+arrName[2][0]+'.';
newData.attributes.customs.custom_103064 = result;
return newData
    `
  },

  {
    name: "Удалить старые даты",
    value: `
newData.type = "users";
let info = data.descriptions;
info = info.split('<br>');
let filtered = chekit.filter(item => {
  let [_, date] = item.split(' | ');
  return moment(date.trim()).format("DD.MM.YYYY HH:mm") >= new Date();
});
newData.description = filtered;
return newData;
    `
  }
]