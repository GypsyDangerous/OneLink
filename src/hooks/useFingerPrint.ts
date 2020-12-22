import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useEffect } from "react";

const useFingerPrint = () => {
	useEffect(() => {
		console.log({ window });
		if (window) {
			(async () => {
				// We recommend to call `load` at application startup.
				const fp = await FingerprintJS.load();

				// The FingerprintJS agent is ready.
				// Get a visitor identifier when you'd like to.
				const result = await fp.get();

				// This is the visitor identifier:
				const visitorId = result.visitorId;
				console.log(visitorId);
			})();
		}
	}, []);
};

export default useFingerPrint