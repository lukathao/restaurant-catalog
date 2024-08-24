create table menus (
  id uuid primary key,
  business_id varchar(100),
  item_name varchar(100),
  item_description varchar(500),
  item_type varchar(50),
  item_price float,
  file_url varchar(500),
  is_active boolean,
  created_at timestamp,
  updated_at timestamp
);