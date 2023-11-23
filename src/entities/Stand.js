class Stand {
    /**
     * @description Construct of an instance of Stand.
     * @param {*} name stand name
     * @param {*} location stand location
     * @param {*} phone stand phone
     * @param {*} mobilephone stand mobile phone
     * @param {*} schedule stand schedule
     * @param {*} id stand id
     */
    constructor(name, location, phone, mobilephone, schedule, id = undefined) {
        this.name = name
        this.location = location
        this.phone = phone
        this.mobilephone = mobilephone
        this.schedule = schedule
        this.id = id
    }

    // Returns a JSON object of Stand
    toJson() {
        return {
            name: this.name,
            location: this.location,
            phone: this.phone,
            mobilephone: this.mobilephone,
            schedule: this.schedule
        }
    }

    editStand(standDto)
    {
        this.name = standDto.name ? standDto.name : this.name
        this.location = standDto.location ? standDto.location : this.location
        this.phone = standDto.phone ? standDto.phone : this.phone
        this.mobilephone = standDto.mobilephone ? standDto.mobilephone : this.mobilephone
        this.schedule = standDto.schedule ? standDto.schedule : this.schedule
        this.standid = standDto.standid ? standDto.standid : this.standid
    }
    
    // Creates a new instance of Stand
    static create(name, location, phone, mobilephone, schedule, id = undefined) {
        if(name.lenght === 0 || location.lenght === 0 || phone.lenght === 0 || mobilephone.lenght === 0 || schedule.lenght === 0) {
            throw new Error("All fields are required");
        }

        return new Stand(name, location, phone, mobilephone, schedule, id)
    }

}

module.exports = Stand