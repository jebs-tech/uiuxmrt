# MyMRTJ · KAYUH MRT

Clickable mobile prototype of a new e-bike sharing feature inside MyMRTJ. The MyMRTJ home retains a familiar feature menu; KAYUH MRT is one additional tile.

Run `npm start`, then open http://localhost:3000. Run `npm test` for browser verification using locally installed Chrome.

Flow: MyMRTJ menu → KAYUH MRT → destination → dock map → e-bike detail → connected payment confirmation → physical QR simulation → unlock → active ride → return confirmation → final payment → summary → MyMRTJ.

The prototype demonstrates Bundaran HI / Pintu B → Pacific Place. Maps, distances, availability, vehicle state, balances, QR detection, locking and charges are illustrative dummy data. No real camera or payment integration is used. Existing MyMRTJ tiles open informational placeholders.

Rate: Rp700 per minute. The pre-ride estimate is 6 minutes / ~Rp4.200. The ride clock starts at a simulated 04:32 and advances every second, including while returning the bike. A labeled simulation control sets the duration to 8 minutes and freezes the demo clock, yielding Rp5.600. Return confirmation captures the actual simulated duration and stops billing. Other durations are prorated by seconds and rounded to the nearest rupiah. Connected payment is charged once, after return. GoPay, OVO and DANA are selectable dummy methods.
