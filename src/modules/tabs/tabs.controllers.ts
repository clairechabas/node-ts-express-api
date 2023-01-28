import { Request, Response } from 'express'
import crypto from 'node:crypto'

interface Tab {
  id: string
  url: string
}
interface ReqBody {
  url: string
}
interface ReqParams {
  id: string
}

// Mock database: replace with DB of your choice
let tabs: Tab[] = []

export async function createTab(
  req: Request<ReqParams, ReqBody>,
  res: Response
) {
  try {
    const newTab: Tab = {
      id: crypto.randomUUID(),
      url: req.body.url,
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

export async function getOneTab(
  req: Request<ReqParams, ReqBody>,
  res: Response
) {
  try {
    const foundTab: Tab | undefined = tabs.find(
      (tab) => tab.id === req.params.id
    )

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

export async function updateTabs(
  req: Request<ReqParams, ReqBody>,
  res: Response
) {
  try {
    const tabIndexInDb = tabs.findIndex((tab) => tab.id === req.params.id)

    if (tabIndexInDb >= tabs.length) {
      return res.status(404).json({
        message: `Not found. The tab with ID ${req.params.id} doesn't exist.`,
      })
    }

    tabs[tabIndexInDb] = {
      ...tabs[tabIndexInDb],
      ...req.body,
    }

    return res.status(200).json({ message: 'Tab updated successfully.' })
  } catch (error) {
    return res.status(400).json({
      message: 'Sorry, an error occurred. Please try again.',
      error,
    })
  }
}

export async function deleteTab(
  req: Request<ReqParams, ReqBody>,
  res: Response
) {
  try {
    tabs = tabs.filter((tab) => tab.id !== req.params.id)

    return res.status(200).json({ message: 'Tab deleted successfully.' })
  } catch (error) {
    return res.status(400).json({
      message: 'Sorry, an error occurred. Please try again.',
      error,
    })
  }
}
