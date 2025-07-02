const User = require('./User');

class Driver extends User {
    constructor(data) {
        super(data);
        this.phoneNumber = data.phoneNumber;
        this.idNo = data.idNo;
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

    getProfile() {
        const base = super.getProfile();
        return {
            ...base,
            vehicleModel: this.vehicleModel,
            carYear: this.carYear,
            phoneNumber: this.phoneNumber,
            role: 'driver'
        };
    }

    static save(driver, db, callback) {
        const sql = `INSERT INTO drivers (
      email, phone_number, id_number, username, birthday,
      billing_type, account_holder, account_number, branch_code, account_type,
      vehicle_model, car_year, car_color, vin, license_plate,
      driver_photo, id_document, inspection_report, license_prdp, criminal_record
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const d = driver.documents;

        const values = [
            driver.email, driver.phoneNumber, driver.IDNo, driver.username, driver.birthday,
            driver.billingType, driver.accountHolder, driver.accountNumber, driver.branchCode, driver.accountType,
            driver.vehicleModel, driver.carYear, driver.carColor, driver.vin, driver.licensePlate,
            d.driverPhoto, d.idDocument, d.inspectionReport, d.licensePrdp, d.criminalRecord
        ];

        db.query(sql, values, callback);
    }
}

module.exports = Driver;