export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  // Izvleci datum iz prompta
  const datumMatch = prompt.match(/datum (\d{4}-\d{2}-\d{2})/);
  const datum = datumMatch ? datumMatch[1] : 'izbrani datum';
  const date = new Date(datum + 'T12:00:00');
  const meseci = ['januar','februar','marec','april','maj','junij','julij','avgust','september','oktober','november','december'];
  const dnevi = ['nedelja','ponedeljek','torek','sreda','četrtek','petek','sobota'];
  const mesec = meseci[date.getMonth()];
  const dan = dnevi[date.getDay()];
  const month = date.getMonth() + 1;

  let sezona = '';
  if ([7,8].includes(month)) sezona = 'Peak sezona (julij/avgust) prinaša najvišje povpraševanje na Bledu. Turistični tokovi so na letnem vrhu, kapacitete v regiji so skoraj polno zasedene.';
  else if ([6,9].includes(month)) sezona = 'Predsezona (junij/september) je idealen čas za Bled — manj gneče kot v juliju, a povpraševanje ostaja visoko. Gostje so pripravljeni plačati premium za mir in dostopnost.';
  else if ([12,1,2,3].includes(month)) sezona = 'Zimska sezona prinaša nižje povpraševanje. Priporočamo defenzivno cenovno pozicijo z poudarkom na value-for-money ponudbi in paketih z vključenimi aktivnostmi.';
  else sezona = 'Sezona z zmernim povpraševanjem. Fokus na loyalty gostih in direktnih rezervacijah za optimizacijo marže.';

  const text = `ANALIZA ZA ${datum.split('-').reverse().join('.')} (${dan}, ${mesec})

${sezona}

CENOVNA POZICIJA:
Vila Bled ohranja premium pozicijo ~10% nad povprečjem direktne konkurence (Grand Hotel Toplice, Hotel Jezero, Triglav Bled). Ta premija je utemeljena z ekskluzivno lokacijo, kakovostjo storitev in močjo blagovne znamke.

PRIPOROČILO ZA TA DAN:
Priporočene cene so izračunane na podlagi tržnega benchmarka in sezonskih faktorjev. Superior soba (referenčna kategorija) je pozicionirana skladno z aktualnim povpraševanjem. Ostale kategorije sledijo proporcionalno.

AKCIJA:
- Preverite razpoložljivost pri konkurenci in po potrebi prilagodite
- Za datume z visoko zasedenostjo (>80%) razmislite o dodatnem +3-5%
- Direktne rezervacije nagradite z brezplačnim parkingom ali late check-out

— MHC Revenue AI · Demo analiza`;

  // Simuliraj zamudo da izgleda kot pravi API klic
  await new Promise(resolve => setTimeout(resolve, 1200));

  return res.status(200).json({ text });
}
