import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { URL_BASE } from './config/config';


export async function middleware(req: NextRequest) {
    const loginUrl = new URL('/auth/login', req.url);
    try {
        const token = req.cookies.get('auth_cookie')?.value;

        if (!token && !(await isValidToken(token||''))) {
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.redirect(loginUrl);
    }
}

async function isValidToken(token: string) {
    try {
        const response = await axios.post(`${URL_BASE}auth/verify-token`, {
            token,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.data.isValid) {
            return false;
        }
        console.log('Token is valid');
        return true;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
}

export const config = {
    matcher: ['/((?!auth|login|_next/static|favicon.ico).*)'],
};

