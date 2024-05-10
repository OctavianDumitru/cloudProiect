My Garage, Vasiliu Octavian-Dumitru, Grupa 1032


Link prezentare: https://www.youtube.com/watch?v=NSJuDtWqjyE 
Link website: https://cloud-proiect.vercel.app/dashboard
Link code sursa API in .NET: https://github.com/OctavianDumitru/cloudProiectAPI

1. Introducere
Acest document descrie un aplicatie care permite gestionarea utilizatorilor, mașinilor și garajelor într-o aplicație web. Scopul API-ului este de a facilita adăugarea, modificarea și ștergerea utilizatorilor, mașinilor asociate cu utilizatorii și alte operațiuni conexe. API-ul este implementat folosind ASP.NET Core și utilizează o bază de date pentru a stoca informații despre utilizatori și mașini.
Pentru a incepe, aplicatie se foloseste de o baza de date si un API creat in .NET 8, ambele fiind hostate pe Azure cloud. Site-ul este o aplicatie de tip React ce este hostat pe Vercel Cloud.

3. Descriere problemă
Aplicația web permite utilizatorilor să își gestioneze garajele virtuale, adăugând și eliminând mașini. API-ul trebuie să ofere:
O metodă de autentificare a utilizatorilor și de obținere a informațiilor despre aceștia.
Operațiuni CRUD (Create, Read, Update, Delete) pentru mașinile asociate cu un utilizator.
Posibilitatea de a lista mașinile din garajul unui utilizator și de a le modifica sau șterge.
Gestionarea relației dintre utilizatori, mărci auto și modele auto.

4. Descriere API
Endpoint-uri cheie:
GET /api/WeatherForecast/GetBrands: Returnează toate mărcile de mașini.
GET /api/WeatherForecast/GetModels?BrandID=1: Returnează toate modelele asociate unei mărci auto.
GET /api/WeatherForecast/GetUsers: Returnează toți utilizatorii.
GET /api/WeatherForecast/GetCarsByUserID?userId=1: Returnează toate mașinile asociate unui utilizator.
POST /api/WeatherForecast/AddCarToUser?UserID=1&ModelID=2&BrandID=3: Adaugă o mașină unui utilizator.
DELETE /api/WeatherForecast/DeleteCar?RecordID=1: Șterge o mașină pe baza ID-ului său.
PUT /api/WeatherForecast/UpdateCar?RecordID=1&ModelID=2&BrandID=3: Actualizează o mașină asociată unui utilizator.


Metode HTTP:
GET, POST, DELETE, și PUT sunt metodele HTTP utilizate de API.
Autentificare și autorizare:
API-ul actual nu conține mecanisme de autentificare sau autorizare. Toate endpoint-urile sunt deschise pentru acces. Dacă este necesară securitate suplimentară, se pot implementa mecanisme de autentificare (de exemplu, OAuth, JWT, etc.).
Exemple de request / response:
GET /api/WeatherForecast/GetBrands
Request: Niciun parametru necesar.
Response:
json
[
  { "brandId": 1, "name": "Toyota" },
  { "brandId": 2, "name": "Ford" }
]
POST /api/WeatherForecast/AddCarToUser?UserID=1&ModelID=2&BrandID=3
Request: Parametrii sunt transmiși în query string.
Response: HTTP 200 OK dacă operația reușește, HTTP 400 Bad Request dacă apare o eroare.
DELETE /api/WeatherForecast/DeleteCar?RecordID=1
Request: Parametrul RecordID este necesar pentru a identifica mașina de șters.
Response: HTTP 200 OK dacă operația reușește, HTTP 404 Not Found dacă mașina nu este găsită.
PUT /api/WeatherForecast/UpdateCar?RecordID=1&BrandID=2&ModelID=3
Request: Parametrii RecordID, BrandID, și ModelID sunt necesari pentru a actualiza o mașină.
Response: HTTP 200 OK dacă operația reușește, HTTP 404 Not Found dacă mașina nu este găsită.


4. Flux de date
Adăugare utilizator: Utilizatorii noi pot fi adăugați folosind endpoint-ul AddUser, care primește un username și un password.
Autentificare utilizator: Pentru a verifica dacă un utilizator există, se poate folosi endpoint-ul CheckUser cu parametrul username.
Listare mașini: Pentru a obține lista mașinilor unui utilizator, se folosește endpoint-ul GetCarsByUserID cu parametrul userId.
Adăugare mașină: Mașinile pot fi adăugate unui utilizator folosind endpoint-ul AddCarToUser cu parametrii UserID, ModelID, și BrandID.
Ștergere mașină: Pentru a șterge o mașină, se folosește endpoint-ul DeleteCar cu parametrul RecordID.
Actualizare mașină: Mașinile existente pot fi actualizate cu endpoint-ul UpdateCar și parametrii RecordID, BrandID, și ModelID.

5. Capturi de Ecran din Aplicatie
Interfata Log In:
![image](https://github.com/OctavianDumitru/cloudProiect/assets/48137850/35c340f9-3e24-4885-940e-f06c09ead6e9)
Interfata principala:
![image](https://github.com/OctavianDumitru/cloudProiect/assets/48137850/d960ba1d-ad6e-4bc3-9032-99c42016ab2d)
Meniu adaugare masina:
![image](https://github.com/OctavianDumitru/cloudProiect/assets/48137850/7577fae2-d510-4bde-83b0-a1d56523e994)

 
