# Foodify API

Backend del sistema de administración de cartas digitales para restaurantes.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Fastify 4 + TypeScript |
| ORM | Prisma 5 |
| Base de datos | SQLite (dev) |
| Validación | Zod |
| Auth | JWT (`@fastify/jwt`) |
| Hashing | bcryptjs |

## Arquitectura

Clean Architecture en 4 capas:

```
src/
├── domain/             # Entidades e interfaces de repositorio (sin dependencias externas)
│   ├── entities/
│   └── repositories/
├── application/        # Casos de uso (orquestan dominio, no conocen HTTP ni Prisma)
│   └── use-cases/
├── infrastructure/     # Implementaciones concretas (Prisma, plugins)
│   └── database/repositories/
└── presentation/       # HTTP: rutas, schemas de validación, middleware
    └── http/
```

## Modelo de datos

### User
Cuenta de usuario. Puede gestionar uno o varios restaurantes.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Int PK | — |
| `first_name` | String | — |
| `last_name` | String | — |
| `email` | String unique | Identificador de login |
| `password` | String | Hash bcrypt |

### Workspace (Restaurante)
Un restaurante. Un usuario puede ser miembro de varios.

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Int PK | — |
| `name` | String | Nombre visible |
| `slug` | String unique | Identificador para URL pública (`/burgerpizza-co`) |
| `address` | String | Dirección física |

### UserWorkspace
Unión N:M entre usuarios y restaurantes. Preparada para soportar roles futuros (owner, staff…).

### Category
Agrupa productos. Una misma categoría puede estar en varias cartas y un producto en varias categorías.

| Campo | Tipo | Descripción |
|---|---|---|
| `order` | Int | Orden por defecto dentro del restaurante |

### Menu (Carta)
Una carta es una selección ordenada de categorías. Un restaurante puede tener varias cartas activas. El QR de mesa apunta al listado de cartas activas.

| Campo | Tipo | Descripción |
|---|---|---|
| `is_active` | Boolean | Visibilidad pública sin borrar la carta |

### MenuCategory
Qué categorías aparecen en qué carta y en qué orden. La misma categoría puede tener órdenes distintos en cartas distintas.

### Product
Unidad del catálogo. Existen tres tipos:

| Tipo | Descripción |
|---|---|
| `REGULAR` | Sin personalización (Agua, Café…) |
| `COMPLEMENTED` | Con opciones de personalización (Hamburguesa, Pizza…) |
| `COMBO` | Compuesto por otros productos (Combo Big Burger…) |

| Campo | Tipo | Descripción |
|---|---|---|
| `price` | Int | Precio base en **céntimos** (`899` = 8.99 €) |
| `type` | String | `REGULAR \| COMPLEMENTED \| COMBO` |
| `content` | String? | Información de cantidad visible al cliente ("280g", "6 uds") |
| `is_available` | Boolean | Ocultar por stock o temporada sin borrar |

El tipo `type` es derivable de las relaciones (`combo_items` → COMBO, `product_product_complement_types` → COMPLEMENTED) pero se declara explícitamente para guiar el formulario de un producto recién creado sin relaciones aún configuradas.

### MenuProductPrice
Precio especial de un producto en una carta concreta. Si no existe registro se usa el precio base. Permite que la Big Burger cueste 8.99 € en la carta principal y 7.49 € en el Menú del Día sin duplicar el producto.

### ComboItem
Cada registro es un slot (componente) de un producto COMBO. Reemplaza el antiguo modelo de "producto hijo con `parent_product_id`", que creaba placeholders en lugar de referenciar productos reales.

| Campo | Tipo | Descripción |
|---|---|---|
| `order` | Int | Orden de presentación del slot |
| `product_id` | Int? | **Slot fijo**: el componente es siempre ese producto del catálogo |
| `complement_type_id` | Int? | **Slot flexible**: lista las opciones disponibles para que el cliente elija |

Un slot es fijo **o** flexible, nunca ambos.

Cuando el slot es flexible, cada opción del `ProductComplementType` tiene un `linked_product_id` que apunta al producto real del catálogo. Al seleccionar esa opción, el sistema puede cargar los complementos de ese producto para personalizarlo.

**Ejemplo — Combo Big Burger:**
```
ComboItem 0: complement_type → "Elige tu hamburguesa" (flexible)
  opciones: Big Burger → linked_product_id=1, Crispy Chicken → linked_product_id=3…
  al elegir Big Burger → se cargan sus complementos: Tipo de carne, Extras, Salsas…

ComboItem 1: complement_type → "Elige tu acompañamiento" (flexible)
ComboItem 2: complement_type → "Elige tu bebida" (flexible)

Combo Nuggets (mix fijo + flexible):
ComboItem 0: product_id → Nuggets (9 uds)  ← fijo, siempre incluido
ComboItem 1: complement_type → "Elige tu acompañamiento" (flexible)
ComboItem 2: complement_type → "Elige tu bebida" (flexible)
```

### ProductComplementType
Grupo de opciones de personalización definido a nivel de restaurante. Se reutiliza entre productos: "Salsas" se asigna a hamburguesas, pizzas y acompañamientos sin duplicar configuración.

| Campo | Tipo | Descripción |
|---|---|---|
| `required` | Boolean | El cliente debe elegir al menos una opción |
| `min_selectable` | Int | Mínimo de selecciones requeridas |
| `max_selectable` | Int | Máximo de selecciones simultáneas (1 = elección única) |

**Ejemplos:**

| Tipo | required | min | max | Comportamiento |
|---|---|---|---|---|
| Tipo de carne | true | 1 | 1 | Exactamente 1 obligatorio |
| Extras | false | 0 | 5 | Hasta 5 opcionales |
| Salsas | false | 0 | 3 | Hasta 3 opcionales |
| Elige tu hamburguesa | true | 1 | 1 | Elección única obligatoria en combo |

### ProductProductComplementType
Qué tipos de complemento están activos en cada producto. Eliminar este registro desactiva la opción para ese producto sin borrar el tipo ni sus opciones del restaurante.

### ProductComplement
Una opción concreta dentro de un tipo de complemento.

| Campo | Tipo | Descripción |
|---|---|---|
| `price` | Int | Ajuste en céntimos. Positivo (+150), negativo (-50) o cero |
| `increment` | Boolean | `true` si el precio se suma al total |
| `is_disabled` | Boolean | Oculta la opción sin borrarla (stock, temporada…) |
| `linked_product_id` | Int? | Si esta opción es un producto real, apunta a él. Permite heredar sus complementos al seleccionarla en un slot flexible de combo |

---

## Endpoints

Base URL: `http://localhost:3000`

Todos los endpoints excepto `/health`, `/auth/register` y `/auth/login` requieren header:
```
Authorization: Bearer <token>
```

### Auth

```
POST /auth/register     Registro de usuario
POST /auth/login        Login → devuelve token JWT
```

### Workspaces

```
GET    /workspaces/         Listar restaurantes del usuario autenticado
POST   /workspaces/         Crear restaurante
PATCH  /workspaces/:id      Actualizar restaurante
```

### Menús

```
GET    /workspaces/:wid/menus/                             Listar cartas
POST   /workspaces/:wid/menus/                             Crear carta
PATCH  /workspaces/:wid/menus/:id                          Actualizar carta
DELETE /workspaces/:wid/menus/:id                          Eliminar carta

POST   /workspaces/:wid/menus/:id/categories/:catId        Añadir categoría a la carta
DELETE /workspaces/:wid/menus/:id/categories/:catId        Quitar categoría de la carta

PUT    /workspaces/:wid/menus/:id/products/:productId/price    Establecer precio especial
DELETE /workspaces/:wid/menus/:id/products/:productId/price    Eliminar precio especial (vuelve al base)
```

### Categorías

```
GET    /workspaces/:wid/categories/        Listar categorías
POST   /workspaces/:wid/categories/        Crear categoría
PATCH  /workspaces/:wid/categories/:id     Actualizar
DELETE /workspaces/:wid/categories/:id     Eliminar
```

### Productos

```
GET    /workspaces/:wid/products/          Listar todos los productos del restaurante
POST   /workspaces/:wid/products/          Crear producto
GET    /workspaces/:wid/products/:id       Detalle con complement_types y combo_items
PATCH  /workspaces/:wid/products/:id       Actualizar
DELETE /workspaces/:wid/products/:id       Eliminar

POST   /workspaces/:wid/products/:id/categories/:catId         Asignar a categoría
DELETE /workspaces/:wid/products/:id/categories/:catId         Desasignar de categoría

POST   /workspaces/:wid/products/:id/complement-types/:typeId  Asignar tipo de complemento
DELETE /workspaces/:wid/products/:id/complement-types/:typeId  Desasignar tipo de complemento

GET    /workspaces/:wid/products/:id/combo-items               Listar slots del combo
POST   /workspaces/:wid/products/:id/combo-items               Añadir slot
PATCH  /workspaces/:wid/products/:id/combo-items/:itemId       Actualizar slot
DELETE /workspaces/:wid/products/:id/combo-items/:itemId       Eliminar slot
```

**Body — crear/actualizar producto:**
```json
{
  "name": "Big Burger",
  "description": "Hamburguesa clásica con lechuga, tomate y salsa especial",
  "price": 899,
  "type": "COMPLEMENTED",
  "content": "280g",
  "image_url": "https://..."
}
```

**Body — añadir slot a combo:**
```json
{ "complement_type_id": 9, "order": 0 }   // slot flexible
{ "product_id": 3, "order": 1 }            // slot fijo
```

### Tipos de complemento

```
GET    /workspaces/:wid/complement-types/                               Listar (incluye sus opciones)
POST   /workspaces/:wid/complement-types/                               Crear tipo
PATCH  /workspaces/:wid/complement-types/:id                            Actualizar tipo
DELETE /workspaces/:wid/complement-types/:id                            Eliminar tipo

POST   /workspaces/:wid/complement-types/:id/complements                Añadir opción
PATCH  /workspaces/:wid/complement-types/:id/complements/:complementId  Actualizar opción
DELETE /workspaces/:wid/complement-types/:id/complements/:complementId  Eliminar opción
```

**Body — crear tipo de complemento:**
```json
{
  "name": "Tipo de carne",
  "required": true,
  "min_selectable": 1,
  "max_selectable": 1
}
```

**Body — añadir opción:**
```json
{ "name": "Bacon extra", "price": 100 }                         // +1.00€
{ "name": "Sin lechuga", "price": 0 }                           // gratis
{ "name": "Tamaño pequeño", "price": -50 }                      // -0.50€
{ "name": "Big Burger", "price": 0, "linked_product_id": 1 }   // slot de combo
```

---

## Setup

```bash
pnpm install
cp .env.example .env       # DATABASE_URL=file:./prisma/dev.db JWT_SECRET=...

pnpm db:migrate            # aplica migraciones
pnpm db:seed               # datos de ejemplo (BurgerPizza Co.)
pnpm dev                   # servidor en http://localhost:3000
```

### Variables de entorno

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Path SQLite: `file:./prisma/dev.db` |
| `JWT_SECRET` | Clave para firmar tokens JWT |

### Datos de seed

```
Usuario:    admin@foodify.com / password123
Restaurante: BurgerPizza Co.
```

Incluye 56 productos, 10 categorías, 13 tipos de complemento, 4 cartas y combos con slots flexibles y fijos.

---

## Decisiones de diseño

### Precios en céntimos
Todos los precios se almacenan como enteros en céntimos (`899` = 8.99 €) para evitar errores de coma flotante. El frontend divide entre 100 para mostrar y multiplica al enviar.

### ComboItem vs parent_product_id
Los combos usan una tabla `ComboItem` que referencia productos reales del catálogo, en lugar de crear "productos hijo" placeholder con `parent_product_id`. Esto permite:
- Reutilizar el mismo producto (Big Burger) en varios combos
- Heredar los complementos del producto elegido en slots flexibles
- Un cambio en el producto base se refleja en todos los combos que lo usan

### linked_product_id en ProductComplement
Cada opción de un slot flexible apunta al producto real del catálogo. Permite que al elegir "Big Burger" en un combo, el sistema cargue los complementos de la Big Burger (Tipo de carne, Extras, Salsas…) para que el cliente pueda personalizarla.

### ProductComplementType a nivel de restaurante
Los tipos de complemento viven en el restaurante, no en el producto. "Salsas" se define una vez y se asigna a hamburguesas, acompañamientos y pizzas. Un cambio (añadir una nueva salsa) se refleja en todos los productos que lo tienen asignado.
