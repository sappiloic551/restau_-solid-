# Restaurant Backend - Documentation & Données de Test

Base URL: http://localhost:3000

Important:
- Remplacez `YOUR_ADMIN_TOKEN` et `YOUR_USER_TOKEN` par un token JWT valide (obtenu via login/register).
- Les endpoints marqués (Admin) nécessitent un compte avec `role = admin`.
- La promotion en admin peut se faire via phpMyAdmin (changer la colonne `role` à `admin`).

---

## 1) Configuration .env (XAMPP / MySQL)

Exemple recommandé (à créer dans `.env` à la racine du projet):

```
# Database Configuration
DB_NAME=restau_db
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=3306

# Server Port
PORT=3000

# JWT Secret
JWT_SECRET=replace_with_a_strong_secret

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

Notes:
- Si `root` a un mot de passe MySQL, renseignez-le dans `DB_PASSWORD`.
- Créez la base `restau_db` dans phpMyAdmin.
- Pour Gmail, utilisez un "App Password" si 2FA activée.

---

## 2) Lancement du serveur

Dans le dossier du projet:

```bash
node server.js
```

Logs attendus:
- `Database synced successfully`
- `Server is running on port 3000`

---

## 3) Authentification (/api/auth)

### 3.1 Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "Admin Seed",
  "email": "admin@example.com",
  "password": "Admin#12345",
  "telephone": "0700000000"
}
```
Réponse: `{ token, user }`

### 3.2 Login
```
POST /api/auth/login
Content-Type: application/json

{ "email": "admin@example.com", "password": "Admin#12345" }
```
Réponse: `{ token, user }`

### 3.3 Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

{ "email": "admin@example.com" }
```

### 3.4 Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

{ "email": "admin@example.com", "code": "123456", "newPassword": "Admin#67890" }
```

### 3.5 Logout (Bearer)
```
POST /api/auth/logout
Authorization: Bearer YOUR_TOKEN
```

---

## 4) Utilisateur courant (/api/users)

### 4.1 GET /me (Bearer)
```
GET /api/users/me
Authorization: Bearer YOUR_TOKEN
```

### 4.2 PATCH /me (Bearer)
```
PATCH /api/users/me
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{ "name": "New Name", "telephone": "0712345678" }
```

---

## 5) Utilisateurs (Admin) (/api/users)

### 5.1 Lister (Admin)
```
GET /api/users
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### 5.2 Obtenir par id (Admin)
```
GET /api/users/2
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### 5.3 Créer un utilisateur (Admin)
```
POST /api/users
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "name": "User One",
  "email": "user1@example.com",
  "password": "User#12345",
  "telephone": "0711111111",
  "role": "utilisateur"
}
```

### 5.4 Mettre à jour un utilisateur (Admin)
```
PATCH /api/users/2
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{ "telephone": "0799999999", "role": "admin" }
```

### 5.5 Supprimer un utilisateur (Admin)
```
DELETE /api/users/2
Authorization: Bearer YOUR_ADMIN_TOKEN
```

---

## 6) Catégories (/api/categories)

### 6.1 Créer (Admin)
```
POST /api/categories
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{ "nom": "Entrées", "description": "Premiers plats" }
```

### 6.2 Lister
```
GET /api/categories
```

### 6.3 Obtenir par id
```
GET /api/categories/1
```

### 6.4 Mettre à jour (Admin)
```
PATCH /api/categories/1
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{ "description": "Entrées froides et chaudes" }
```

### 6.5 Supprimer (Admin)
```
DELETE /api/categories/1
Authorization: Bearer YOUR_ADMIN_TOKEN
```

---

## 7) Plats (/api/plats)

### 7.1 Créer (Admin)
```
POST /api/plats
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{ "nom_plat": "Salade César", "description": "Salade", "prix": 8.5, "id_categorie": 1 }
```

### 7.2 Lister
```
GET /api/plats
```

### 7.3 Obtenir par id
```
GET /api/plats/1
```

### 7.4 Mettre à jour (Admin)
```
PATCH /api/plats/1
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{ "prix": 9.0 }
```

### 7.5 Supprimer (Admin)
```
DELETE /api/plats/1
Authorization: Bearer YOUR_ADMIN_TOKEN
```

---

## 8) Commandes (/api/commandes)

Règles:
- Un utilisateur normal ne voit que ses commandes.
- Un admin voit toutes les commandes.

### 8.1 Créer (Bearer)
```
POST /api/commandes
Authorization: Bearer YOUR_USER_TOKEN
Content-Type: application/json

{ "items": [ { "id_plat": 1, "quantite": 2 } ] }
```

### 8.2 Lister (Bearer)
```
GET /api/commandes
Authorization: Bearer YOUR_TOKEN
```

### 8.3 Obtenir par id (Bearer)
```
GET /api/commandes/1
Authorization: Bearer YOUR_TOKEN
```

### 8.4 Mettre à jour le statut (Bearer)
Valeurs: `en_cours`, `valide`, `livre`, `annule`
```
PATCH /api/commandes/1/status
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{ "statut": "valide" }
```

### 8.5 Supprimer (Bearer)
```
DELETE /api/commandes/1
Authorization: Bearer YOUR_TOKEN
```

---

## 9) Ordre de test recommandé

1) Démarrer MySQL (XAMPP) et créer la base `restau_db`.
2) Configurer `.env` (section 1) puis lancer le serveur (section 2).
3) Register `admin@example.com` via `/api/auth/register`.
4) Promouvoir ce compte en `admin` via phpMyAdmin.
5) Créer une catégorie puis un plat (endpoints Admin).
6) Créer un user standard (via `/api/users` Admin ou `/api/auth/register`).
7) Créer une commande avec un user standard.
8) Vérifier listage commandes en admin vs user.
9) Tester les endpoints utilisateurs Admin (list/get/create/update/delete).
