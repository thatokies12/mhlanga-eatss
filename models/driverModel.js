class Driver extends user {
    constructor(data) {
        this.phoneNumber = data.phoneNumber;
        this.IDNo = data.IDNo;
        this.birthday = data.birthday;
        this.billingType = data.billingType;
        this.accountHolder = data.accountHolder;
        this.accountNumber = data.accountNumber;
        this.branchCode = data.branchCode;
        this.accountType = data.accountType;
        this.vehicleModel = data.vehicleModel;
        this.carYear = data.carYear;
        this.carColor = data.carColor;
        this.vin = data.vin;
        this.licensePlate = data.licensePlate;
        this.documents = data.documents;
    }

    static save(driver, db, callback) {
        const sql = `INSERT INTO drivers (
       phone_number, id_number, birthday,
      billing_type, account_holder, account_number, branch_code, account_type,
      vehicle_model, car_year, car_color, vin, license_plate,
      driver_photo, id_document, inspection_report, license_prdp, criminal_record
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const docs = driver.documents;
        const values = [
            driver.phoneNumber, driver.IDNo, driver.birthday,
            driver.billingType, driver.accountHolder, driver.accountNumber, driver.branchCode, driver.accountType,
            driver.vehicleModel, driver.carYear, driver.carColor, driver.vin, driver.licensePlate,
            docs.driverPhoto, docs.idDocument, docs.inspectionReport, docs.licensePrdp, docs.criminalRecord
        ];

        db.query(sql, values, callback);
    }
}

module.exports = Driver;