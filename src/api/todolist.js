const express = require('express');
const { doc, getDoc, collection, addDoc, getDocs, query, orderBy, deleteDoc, updateDoc } = require('firebase/firestore');

async function isStudent(db, KEY) {
    const docRef = doc(db, 'User', KEY);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

module.exports = (db) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        const Auth = req.get('Auth');

        if (!Auth) {
            return res.status(400)
                .send(`กรุณากรอกข้อมูลให้ครบถ้วน`);
        }

        if (await isStudent(db, Auth)) {
            let Data = [];
            const querySnapshot = await getDocs(query(collection(db, "User", Auth, "Todo"), orderBy("timestamp", "asc")));
            querySnapshot.forEach((doc) => {
                datt = doc.data();
                datt.id = doc.id;
                Data.push(datt);
            });

            return res.send(Data);
        } else {
            return res.status(400).send(
                `Invalid Credentials`
            );
        }
    });

    router.post('/add', async (req, res) => {
        const { user: User, decs: Decs, due: Due, subj: Subject, timestamp: timestamp } = req.body;

        if (!User || !Decs || !Due || !Subject || !timestamp) {
            return res.status(400)
                .send(`กรุณากรอกข้อมูลให้ครบถ้วน`);
        }

        if (await isStudent(db, User)) {
            await addDoc(collection(db, "User", User, "Todo"), {
                Decs,
                Due,
                Subject,
                timestamp,
                status: "NOTD"
            });

            return res.send('Add To List!');
        } else {
            return res.status(400).send(
                `Invalid Credentials`
            );
        }
    });

    router.delete('/remove', async (req, res) => {
        const { user: User, id: ID } = req.body;

        if (!User || !ID) {
            return res.status(400)
                .send(`กรุณากรอกข้อมูลให้ครบถ้วน`);
        }

        if (await isStudent(db, User)) {
            await deleteDoc(doc(db, "User", User, "Todo", ID));

            return res.send('Remove done!');
        } else {
            return res.status(400).send(
                `Invalid Credentials`
            );
        }
    });

    router.patch('/update', async (req, res) => {
        const { user: User, id: ID } = req.body;

        if (!User || !ID) {
            return res.status(400)
                .send(`กรุณากรอกข้อมูลให้ครบถ้วน`);
        }

        if (await isStudent(db, User)) {
            const docRef = doc(db, "User", User, "Todo", ID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const todoDocRef = doc(db, "User", User, "Todo", ID);
                if (docSnap.data().status == "NOTD") {
                    await updateDoc(todoDocRef, {
                        status: "DONE"
                    });
                } else {
                    await updateDoc(todoDocRef, {
                        status: "NOTD"
                    });
                }

                return res.send('Done update!');
            } else {
                return res.status(400).send(
                    `No such document!`
                );
            }
        } else {
            return res.status(400).send(
                `Invalid Credentials`
            );
        }
    });

    return {
        baseRoute: '/todo',
        router,
    };
};
