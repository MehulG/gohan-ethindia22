# gohan-ethindia22

####MeData
Health Compute Engine using ZKP

### How it works

- Third-party gets permission from the user to utilize the data via push protocol.
- Once the user accepts their request, the user performs computation and generates zk proof on mina.
- After generating the proof, user makes a smart contract call on polygon generating push notification.
- Third-party gets the push from push protocol, thus, they can query and verify zk proof from Mina protocol.

### Architecture Overview

<img width="827" alt="スクリーンショット 2022-12-04 5 17 14" src="https://user-images.githubusercontent.com/117018140/205467565-aa8271c4-72ab-4edb-8dd6-f798cfa59091.png">

### How it’s made
-  Reveal the user’s condition while keeping data private
1. Store health data in IPFS / local storage
2. Use push protocol and polygon to inform users that a third party wants to access to their data.
3. the user generates zk proof from data.
4. Verify proof: such as heartbeat range is about 60~70 without revealing the entire data.

### Benefits

### For users

- Control access and use of your data through fine-grained permissions
- Just reveal data attributes while keeping data private

### For self-tracking Apps

- Connected real-world data yields better insights for your users
- Connect to a user's existing data to keep data privacy

### For Pharmaceutical Companies

- Link clinical trial data to medical claims and electronic health record data to conduct long-term safety and efficacy studies.

### For Insurers

- Improve value-based care analytics and sharpen total cost of care estimates by linking to EHR and clinical data
- Hone risk adjustment factor calculations by linking claims to social determinant data, to properly estimate the true cost of patient care
