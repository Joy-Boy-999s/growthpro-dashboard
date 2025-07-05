import { Request, Response } from 'express';
import { BusinessRequest, BusinessResponse } from '@growthpro-dashboard/shared-models';

const HEADLINES = [
    "Why {name} is {location}'s Sweetest Spot in {year}",
    "Top Rated: {name} Leads {location}'s Food Scene",
    "{name} - {location}'s Hidden Gem You Must Try",
    "Customers Love {name} - Here's Why",
    "{location}'s Best Kept Secret: {name}",
    "Why Everyone in {location} is Talking About {name}",
    "{name} Sets New Standard in {location}'s Dining",
    "The Ultimate {location} Experience: {name}",
    "{name} - Redefining Excellence in {location}",
    "Don't Miss {location}'s Hottest Spot: {name}"
];

const generateHeadline = (name: string, location: string): string => {
    const year = new Date().getFullYear();
    const template = HEADLINES[Math.floor(Math.random() * HEADLINES.length)];
    return template
        .replace(/{name}/g, name)
        .replace(/{location}/g, location)
        .replace(/{year}/g, year.toString());
};

const generateRating = (): number => {
    return parseFloat((Math.floor(Math.random() * 16) * 0.1 + 3.5).toFixed(1));
};

const generateReviews = (): number => {
    return Math.floor(Math.random() * 491) + 10;
};

export const getBusinessData = (req: Request<{}, {}, BusinessRequest>, res: Response<BusinessResponse>) => {
    try {
        const { name, location } = req.body;

        // Input validation
        if (!name || !location) {
            return res.status(400).json({ error: 'Both business name and location are required' } as any);
        }

        if (name.length > 50 || location.length > 50) {
            return res.status(400).json({ error: 'Business name and location must be less than 50 characters' } as any);
        }

        const rating = generateRating();
        const reviews = generateReviews();
        const headline = generateHeadline(name, location);

        res.json({
            rating,
            reviews,
            headline
        });
    } catch (error) {
        console.error('Error in /business-data:', error);
        res.status(500).json({ error: 'Internal server error' } as any);
    }
};

export const regenerateHeadline = (req: Request<{}, {}, {}, BusinessRequest>, res: Response<{ headline: string }>) => {
    try {
        const { name, location } = req.query;

        // Input validation
        if (!name || !location) {
            return res.status(400).json({ error: 'Both business name and location are required' } as any);
        }

        const headline = generateHeadline(name, location);
        res.json({ headline });
    } catch (error) {
        console.error('Error in /regenerate-headline:', error);
        res.status(500).json({ error: 'Internal server error' } as any);
    }
};