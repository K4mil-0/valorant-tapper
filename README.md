# 🖱️ Valorant Clicker

W pełni funkcjonalna, rozbudowana aplikacja mobilna typu "clicker" osadzona w świecie gry Valorant. Projekt stworzony w celach edukacyjnych oraz jako zaawansowany element portfolio, napisany w technologii React Native i Expo.

## 📱 Pobierz i przetestuj aplikację

Chcesz sprawdzić, jak aplikacja działa w praktyce? Pobierz gotową wersję instalacyjną na swój telefon z systemem Android:
[📥 Pobierz wersję APK na Androida](https://github.com/K4mil-0/valorant-tapper/releases/download/v1.0/nazwa-pliku.apk)
*(Kliknij link, pobierz plik na telefon i zainstaluj aplikację. Zastąp ten znak '#' linkiem wygenerowanym przez serwery Expo po zakończeniu budowania!)*

## 🚀 Technologie

* **Framework:** React Native / Expo
* **Pamięć lokalna:** AsyncStorage (zapisywanie stanu gry)
* **Zewnętrzne dane:** Integracja na żywo z publicznym API (valorant-api.com)
* **Build system:** EAS Build (Expo Application Services)
* **Kontrola wersji:** Git / GitHub

## ✨ Funkcje

* **Dynamiczna ekonomia:** Matematyczne skalowanie zdrowia skrzynek (aż do 50 bilionów HP), obrażeń i wartości skinów.
* **System zarobków offline:** Gra oblicza czas nieobecności i po powrocie symuluje zdobyte kredyty oraz skrzynki na podstawie 1% pasywnego DPS.
* **Ekwipunek i rynek:** Kolekcjonowanie skinów, wyposażanie ich (zwiększanie siły kliknięcia) oraz sprzedaż z ryzykiem utraty dostępu do map.
* **Zarządzanie Agentami:** Rekrutacja i ulepszanie postaci do 4 poziomu, gdzie odblokowują potężne umiejętności rzucane w tle.
* **System rang (Iron - Radiant):** Interaktywny system awansu bazujący na wypełnianiu rotacyjnych misji.
* **Zoptymalizowane animacje:** Płynne, nieblokujące interfejsu powiadomienia i animacje wykorzystujące natywny system React Native (`Animated`).

## 🛠️ Jak uruchomić projekt lokalnie

1. **Sklonuj repozytorium:** `git clone https://github.com/K4mil-0/valorant-clicker`
2. **Zainstaluj zależności:** `npm install`
3. **Uruchom serwer deweloperski:** `npx expo start`
