import { db, Questions } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
    await db.insert(Questions).values([
        {
            id: 1,
            question:
                "Pada sebuah kawat penghantar mengalir arus listrik sebesar 0,5 A. Jumlah muatan yang dilewati selama 120 menit adalah ...",
            answer: 10,
        },
        {
            id: 2,
            question:
                "Beda potensial A dan B adalah 1.500 volt, di mana muatan yang berpindah sebesar 0,4 milicoulomb maka energinya ...",
            answer: 10,
        },
    ]);
}
