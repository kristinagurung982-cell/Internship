type OTPRecord = {
	email: string;
	otp: string;
	expiresAt: Date;
};

const store = new Map<string, OTPRecord>();

const otpRepository = {
	async save(record: OTPRecord) {
		store.set(record.email, record);
		return record;
	},
	async findByEmail(email: string) {
		const rec = store.get(email);
		if (!rec) return null;
		return rec;
	},
	async verify(email: string, otp: string) {
		const rec = store.get(email);
		if (!rec) return false;
		if (rec.expiresAt < new Date()) return false;
		return rec.otp === otp;
	}
};

export default otpRepository;