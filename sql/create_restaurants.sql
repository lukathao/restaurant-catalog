create table restaurants (
  id uuid primary key,
  business_name varchar(100),
  business_owner varchar(100),
  address_street varchar(100),
  address_city varchar(100),
  address_state varchar(100),
  address_zipcode varchar(10),
  is_active boolean,
  created_at timestamp,
  updated_at timestamp
);