# H5P Content Packages

This directory contains H5P interactive content packages for the Education section.

## Current Topics

The following H5P files are expected by the application:

1. `Falls_Prevention_QuestionSet.h5p`
2. `Delirium_Management_QuestionSet.h5p`
3. `Polypharmacy_QuestionSet.h5p`
4. `Frailty_Assessment_QuestionSet.h5p`
5. `Dementia_Care_QuestionSet.h5p`
6. `Pressure_Ulcers_QuestionSet.h5p`
7. `Nutrition_in_Elderly_QuestionSet.h5p`
8. `Urinary_Incontinence_QuestionSet.h5p`

## Creating H5P Files

To create actual H5P content packages:

1. Use H5P.org's content creation tools
2. Import the questions from `/public/data/topics.json`
3. Export as .h5p files
4. Replace the placeholder files in this directory

## Placeholder Files

The current files are placeholders to prevent 404 errors. They contain:
- JSON structure mimicking H5P Question Set format
- Questions imported from topics.json
- Basic metadata

Replace these with actual H5P packages created using:
- H5P.org online editor
- Moodle with H5P plugin
- WordPress with H5P plugin
- Standalone H5P editor

## File Naming Convention

Files must follow this exact naming pattern:
- Topic name with spaces replaced by underscores
- Followed by `_QuestionSet.h5p`
- Example: `Falls_Prevention_QuestionSet.h5p`