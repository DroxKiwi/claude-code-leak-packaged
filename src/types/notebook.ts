export type NotebookCellSource = string | string[]

export type NotebookCellOutput = {
	[key: string]: unknown
}

export type NotebookCellSourceOutput = NotebookCellOutput

export type NotebookOutputImage = {
	data?: string
	media_type?: string
	[key: string]: unknown
}

export type NotebookCellType = {
	id?: string
	cell_type?: string
	source?: NotebookCellSource
	outputs?: NotebookCellOutput[]
	[key: string]: unknown
}

export type NotebookCell = NotebookCellType

export type NotebookContent = {
	cells: NotebookCell[]
	metadata?: Record<string, unknown>
	[key: string]: unknown
}
