import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { business: { include: { customVessels: { orderBy: { createdAt: 'asc' } } } } }
    })

    if (!user?.business) {
      return NextResponse.json({ vessels: [] })
    }

    return NextResponse.json({ vessels: user.business.customVessels })
  } catch (error) {
    console.error('GET custom-vessels error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, diameter, height, unit, imageData } = body

    if (!name || !diameter || !height) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { business: true }
    })

    if (!user?.business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 })
    }

    const vessel = await prisma.customVessel.create({
      data: {
        businessId: user.business.id,
        name,
        diameter: parseFloat(diameter),
        height: parseFloat(height),
        unit: unit || 'cm',
        imageData: imageData || null
      }
    })

    return NextResponse.json({ vessel })
  } catch (error) {
    console.error('POST custom-vessels error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
