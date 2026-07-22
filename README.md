# Blovit Commerce Platform — AO ERP Integration Contract

This is the single source of truth for the integration between the **Blovit Next.js frontend** and the **AO ERP backend**. 

---

## Getting Started

### Local Development Setup

To run the frontend locally:
1. Navigate to the `frontend/` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file inside `frontend/` with the following variables:
   ```env
   # Toggle to mock all API calls locally
   NEXT_PUBLIC_USE_MOCK_API=true
   
   # Base URL for the AO ERP REST API (used when MOCK_API is false/unset)
   NEXT_PUBLIC_API_BASE_URL=https://api.amudhasurabiy.com/api
   
   # Public Razorpay Key ID
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_yourkeyhere
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## API Contract (JSON Request & Response Shapes)

All live API routes are relative to `${NEXT_PUBLIC_API_BASE_URL}`.

### 1. Products

#### `GET /api/products`
Retrieves the list of products.
- **Response Shape (`200 OK`):**
  ```json
  [
    {
      "id": "abc-malt",
      "name": "Blovit ABC Malt",
      "slug": "abc-malt",
      "price": 250,
      "description": "Apple, Beetroot, Carrot health drink powder. Rich nutrition, no preservatives, 100% organic.",
      "imageUrl": "/images/abc-malt.jpg",
      "benefits": [
        "Natural immunity booster",
        "Rich source of vitamins and dietary fibers",
        "Improves digestional health & stamina"
      ],
      "ingredients": [
        "Apple extract",
        "Beetroot powder",
        "Carrot powder",
        "Sprouted grains",
        "Natural palm sugar",
        "Cardamom"
      ],
      "nutritionFacts": {
        "Energy": "385 kcal",
        "Carbohydrates": "88g",
        "Protein": "4.5g",
        "Fat": "0.5g",
        "Iron": "12mg"
      },
      "usageInstructions": "Add 2-3 spoons of Blovit ABC Malt to hot milk or warm water. Stir well and serve. No need to add extra sugar.",
      "isBestseller": true
    }
  ]
  ```

#### `GET /api/products/:slug`
Retrieves detailed information for a single product by its slug (e.g. `abc-malt`, `beetroot-malt`, `nendram-banana-malt`).
- **Response Shape (`200 OK`):** Same object structure as above, single item.

---

### 2. Shopping Cart

#### `POST /api/cart/sync`
Syncs local guest cart items with the database.
- **Request Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "items": [
      {
        "productId": "abc-malt",
        "qty": 2
      }
    ]
  }
  ```
- **Response Shape (`200 OK`):**
  ```json
  {
    "success": true,
    "syncedCount": 1
  }
  ```

---

### 3. Shipping Charge Calculator

#### `POST /api/shipping/calculate`
Calculates shipping fees based on Indian pincodes and cart subtotal.
- **Request Body:**
  ```json
  {
    "pincode": "612001",
    "subtotal": 350
  }
  ```
- **Response Shape (`200 OK`):**
  ```json
  {
    "shippingCharge": 60,
    "freeShippingThreshold": 499,
    "isFreeShippingEligible": false,
    "message": "Shipping applicable for Tamil Nadu"
  }
  ```
*Rule parameters used by the frontend for calculations:*
- **Tamil Nadu** (starts with '60' to '64'): ₹60 (free shipping at ₹499+)
- **Kerala** (starts with '67' to '69'): ₹80 (free shipping at ₹799+)
- **Karnataka** (starts with '56' to '59'): ₹90 (free shipping at ₹799+)
- **Rest of India**: ₹110 (free shipping at ₹999+)

---

### 4. OTP Authentication

#### `POST /api/auth/otp/request`
Requests a 4-to-6 digit OTP sent to the user's phone number.
- **Request Body:**
  ```json
  {
    "phone": "9876543210"
  }
  ```
- **Response Shape (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "OTP sent successfully"
  }
  ```

#### `POST /api/auth/otp/verify`
Verifies OTP code and logs in/creates customer account.
- **Request Body:**
  ```json
  {
    "phone": "9876543210",
    "otp": "123456"
  }
  ```
- **Response Shape (`200 OK`):**
  ```json
  {
    "token": "eyJhbGciOi...",
    "user": {
      "phone": "9876543210",
      "name": "Jane Doe",
      "rewardPoints": 150
    }
  }
  ```

---

### 5. Account Details & History

All endpoints in this section require an `Authorization: Bearer <token>` header.

#### `GET /api/account/orders`
Retrieves a list of order records for the logged-in customer.
- **Response Shape (`200 OK`):**
  ```json
  [
    {
      "id": "ord_1001",
      "orderNumber": "BLV-10029",
      "createdAt": "2026-07-22T04:46:14Z",
      "total": 560,
      "shippingCharge": 60,
      "discount": 50,
      "status": "Delivered",
      "items": [
        {
          "productId": "abc-malt",
          "name": "Blovit ABC Malt",
          "quantity": 2,
          "price": 250
        }
      ]
    }
  ]
  ```

#### `GET /api/account/orders/:id`
Retrieves detailed information for a single order.

#### `GET /api/account/addresses`
Retrieves delivery addresses saved by the logged-in customer.
- **Response Shape (`200 OK`):**
  ```json
  [
    {
      "id": "addr_1",
      "name": "Jane Doe",
      "line1": "12, Sannathi Street",
      "line2": "Near Temple",
      "city": "Kumbakonam",
      "state": "Tamil Nadu",
      "pincode": "612001",
      "phone": "9876543210"
    }
  ]
  ```

#### `POST /api/account/addresses`
Saves a new address for the logged-in user.
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "line1": "12, Sannathi Street",
    "line2": "Near Temple",
    "city": "Kumbakonam",
    "state": "Tamil Nadu",
    "pincode": "612001",
    "phone": "9876543210"
  }
  ```
- **Response Shape (`200 OK`):** Address object structure (including a generated `"id"` string).

#### `GET /api/account/wishlist`
Retrieves list of product IDs currently favorited.
- **Response Shape (`200 OK`):**
  ```json
  ["abc-malt", "beetroot-malt"]
  ```

---

### 6. Coupon Validation

#### `POST /api/coupons/validate`
Validates a discount coupon code against the current order subtotal.
- **Request Body:**
  ```json
  {
    "code": "ORGANIC10",
    "subtotal": 500
  }
  ```
- **Response Shape (`200 OK`):**
  ```json
  {
    "valid": true,
    "discount": 50,
    "type": "percentage",
    "value": 10,
    "message": "10% coupon applied successfully"
  }
  ```

---

### 7. Razorpay Integration

#### `POST /api/razorpay/create-order`
Initiates a payment order on the backend with Razorpay's API.
- **Request Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "cartId": "cart_xyz"
  }
  ```
- **Response Shape (`200 OK`):**
  ```json
  {
    "id": "order_PKy5462hgsj",
    "amount": 56000,
    "currency": "INR"
  }
  ```

#### `POST /api/razorpay/verify`
Submits signature response from Razorpay client widget to verify integrity.
- **Request Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "orderId": "order_PKy5462hgsj",
    "paymentId": "pay_PKy87364hsj",
    "signature": "c5fde8bfa813d9647ab28d..."
  }
  ```
- **Response Shape (`200 OK`):**
  ```json
  {
    "success": true,
    "orderNumber": "BLV-10030"
  }
  ```
