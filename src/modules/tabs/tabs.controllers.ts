import { Request, Response } from 'express'
import crypto from 'node:crypto'

interface Tab {
  id: string
  createdAt: Date
  url: string
}
type TabRequestBody = { url: string }
type TabRequestParams = { id: string }

let tabs: Tab[] = []

export async function createTab(req: Request, res: Response) {
  try {
    const body = req.body as TabRequestBody
    const newTab: Tab = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      url: body.url,
    }

    tabs.push(newTab)

    return res.status(201).json({ message: 'New tab created successfully.' })
  } catch (error) {
    return res.status(400).json({
      message: 'Sorry, an error occurred. Please try again.',
      error,
    })
  }
}

export async function getAllTabs(req: Request, res: Response) {
  try {
    return res.status(200).json({ tabs })
  } catch (error) {
    return res.status(400).json({
      message: 'Sorry, an error occurred. Please try again.',
      error,
    })
  }
}

export async function getOneTab(req: Request, res: Response) {
  try {
    const params = req.params as TabRequestParams
    const foundTab: Tab | undefined = tabs.find((tab) => tab.id === params.id)

    if (!foundTab) {
      return res.status(404).json({ message: `Sorry, we can't find this tab.` })
    }

    return res.status(200).json({ tab: foundTab })
  } catch (error) {
    return res.status(400).json({
      message: 'Sorry, an error occurred. Please try again.',
      error,
    })
  }
}

export async function updateTabs(req: Request, res: Response) {
  try {
    const body = req.body as TabRequestBody
    const params = req.params as TabRequestParams
    const tabIndexInDb = tabs.findIndex((tab) => tab.id === params.id)

    if (tabIndexInDb >= tabs.length) {
      return res.status(404).json({
        message: `Not found. The tab with ID ${params.id} doesn't exist.`,
      })
    }

    tabs[tabIndexInDb] = {
      ...tabs[tabIndexInDb],
      ...body,
    }

    return res.status(200).json({ message: 'Tab updated successfully.' })
  } catch (error) {
    return res.status(400).json({
      message: 'Sorry, an error occurred. Please try again.',
      error,
    })
  }
}

export async function deleteTab(req: Request, res: Response) {
  try {
    const params = req.params as TabRequestParams
    tabs = tabs.filter((tab) => tab.id !== params.id)

    return res.status(200).json({ message: 'Tab deleted successfully.' })
  } catch (error) {
    return res.status(400).json({
      message: 'Sorry, an error occurred. Please try again.',
      error,
    })
  }
}
