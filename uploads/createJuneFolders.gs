
function createJuneFolders() {
  const mainFolder = DriveApp.createFolder("JUNE 2025");

  const people = ["DAVID", "TEBATSO"];
  const innerFolders = ["MOV", "PROJECT", "REPORT"];

  for (let day = 1; day <= 30; day++) {
    const dayStr = day.toString().padStart(2, '0') + " JUNE";
    const dayFolder = mainFolder.createFolder(dayStr);

    people.forEach(person => {
      const personFolder = dayFolder.createFolder(person);
      innerFolders.forEach(sub => {
        personFolder.createFolder(sub);
      });
    });
  }
}
