-- DO NOT ADD UPDATE OR DELETE STATEMENTS TO THIS FILE. THIS FILE SHOULD ONLY CONTAIN CREATE TABLE AND INSERT STATEMENTS.
-- ONLY USE THIS FILE TO SETUP THE DATABASE SCHEMA AND SEED DATA. ANY OTHER SQL STATEMENTS SHOULD BE PLACED IN A SEPARATE FILE.

-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY, -- This should be an auto-incrementing integer. In PostreSQL, this is referred to as Serial.
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders',
 'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
 'info@brightfuturebuilders.org',
 'bright-minds.jpg'),

('GreenHarvest Growers',
 'An urban farming collective promoting food sustainability and education in local neighborhoods.',
 'contact@greenharvest.org',
 'green-earth.jpg'),

('UnityServe Volunteers',
 'A volunteer coordination group supporting local charities and service initiatives.',
 'hello@unityserve.org',
 'community-builders.jpg');



-- ========================================
-- Project Table
-- ========================================
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,          -- Auto-incrementing ID for each project
    organization_id INT NOT NULL,           -- Foreign key to the sponsoring organization
    title VARCHAR(200) NOT NULL,            -- Project title
    description TEXT NOT NULL,              -- Project description
    location VARCHAR(255) NOT NULL,         -- Where the project takes place
    project_date DATE NOT NULL,             -- Date of the project
    CONSTRAINT fk_organization -- giving a name to the foreign key constraint
        FOREIGN KEY (organization_id) -- stating which column is the foreign key
        REFERENCES organization (organization_id) -- points to the primary key of the organization table
        ON DELETE CASCADE -- if an organization is deleted, all its projects will be deleted as well
);

-- ========================================
-- Sample Projects
-- ========================================

-- BrightFuture Builders (organization_id = 1)
INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(1, 'Community Park Renovation',
 'Renovating the local park with new benches, playground equipment, and landscaping.',
 'Johannesburg Central Park',
 '2026-06-01'),
(1, 'School Roof Repair',
 'Repairing and reinforcing the roof of a local elementary school.',
 'Brakpan Primary School',
 '2026-07-15'),
(1, 'Water Well Construction',
 'Building a sustainable water well for a rural community.',
 'KwaZulu-Natal Village',
 '2026-08-10'),
(1, 'Community Center Expansion',
 'Expanding the local community center to include a library and study rooms.',
 'Soweto Community Center',
 '2026-09-05'),
(1, 'Playground Safety Upgrade',
 'Installing safe play structures and rubber flooring for children.',
 'Pretoria North Playground',
 '2026-10-20');

-- GreenHarvest Growers (organization_id = 2)
INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(2, 'Urban Garden Setup',
 'Creating a rooftop garden to promote food sustainability.',
 'Johannesburg CBD Rooftop',
 '2026-06-12'),
(2, 'Community Compost Program',
 'Launching a composting initiative to reduce waste and improve soil.',
 'Durban Community Hall',
 '2026-07-22'),
(2, 'School Garden Project',
 'Teaching students how to grow vegetables and herbs.',
 'Cape Town High School',
 '2026-08-18'),
(2, 'Hydroponics Workshop',
 'Training locals on hydroponic farming techniques.',
 'Pretoria Training Center',
 '2026-09-09'),
(2, 'Neighborhood Farmers Market',
 'Organizing a weekly farmers market to sell local produce.',
 'Sandton Square',
 '2026-10-25');

-- UnityServe Volunteers (organization_id = 3)
INSERT INTO project (organization_id, title, description, location, project_date)
VALUES
(3, 'Food Drive',
 'Collecting non-perishable food items for families in need.',
 'Johannesburg Warehouse',
 '2026-06-05'),
(3, 'Clothing Donation Campaign',
 'Gathering clothes for shelters and orphanages.',
 'Durban Shelter',
 '2026-07-19'),
(3, 'Senior Home Assistance',
 'Providing companionship and assistance to elderly residents.',
 'Pretoria Senior Home',
 '2026-08-14'),
(3, 'Neighborhood Clean-Up',
 'Volunteers gather to remove litter and beautify local streets.',
 'Cape Town Suburbs',
 '2026-09-07'),
(3, 'Literacy Tutoring',
 'Offering free tutoring sessions to improve literacy rates.',
 'Soweto Library',
 '2026-10-28');


-- ========================================
-- Category Table
-- ========================================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,       -- Auto-incrementing ID
    name VARCHAR(100) UNIQUE NOT NULL,  -- Category name must be unique
    description TEXT NOT NULL,            -- Category description
    logo_filename VARCHAR(255) NOT NULL   -- Logo filename not null
);

-- Insert sample categories
INSERT INTO category (name, description, logo_filename)
VALUES
('Environmental', 'Projects focused on protecting and preserving the natural environment.', 'green-earth.jpg'),
('Educational', 'Learning and skill-building initiatives for personal and community growth.', 'bright-minds.jpg'),
('Community Service', 'Volunteer projects that strengthen and serve local neighborhoods.', 'community-builders.jpg');

-- ========================================
-- Project_Category Junction Table
-- ========================================
CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    CONSTRAINT fk_project
        FOREIGN KEY (project_id)
        REFERENCES project (project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE,
    CONSTRAINT pk_project_category PRIMARY KEY (project_id, category_id)
);

-- ========================================
-- Associate Projects with Categories
-- ========================================
-- Example associations (adjust project_id values to match your seeded projects)
INSERT INTO project_category (project_id, category_id) VALUES
(1, 1),  -- Community Park Renovation → Environmental
(2, 3),  -- School Roof Repair → Community Service
(3, 1),  -- Water Well Construction → Environmental
(4, 2),  -- Community Center Expansion → Educational
(5, 3),  -- Playground Safety Upgrade → Community Service

(6, 1),  -- Urban Garden Setup → Environmental
(7, 1),  -- Community Compost Program → Environmental
(8, 2),  -- School Garden Project → Educational
(9, 2),  -- Hydroponics Workshop → Educational
(10, 3), -- Neighborhood Farmers Market → Community Service

(11, 3), -- Food Drive → Community Service
(12, 3), -- Clothing Donation Campaign → Community Service
(13, 3), -- Senior Home Assistance → Community Service
(14, 1), -- Neighborhood Clean-Up → Environmental
(15, 2); -- Literacy Tutoring → Educational
