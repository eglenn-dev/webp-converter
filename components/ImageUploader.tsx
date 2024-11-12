'use client'

import { useState } from 'react'
import { convertToWebP } from '../app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function ImageUploader() {
    const [file, setFile] = useState<File | null>(null)
    const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null)
    const [convertedFilename, setConvertedFilename] = useState<string | null>(null)
    const [isConverting, setIsConverting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return

        setIsConverting(true)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const result = await convertToWebP(formData)
            const blob = new Blob([Buffer.from(result.webpBuffer, 'base64')], { type: 'image/webp' })
            const url = URL.createObjectURL(blob)
            setConvertedImageUrl(url)
            setConvertedFilename(result.filename)
        } catch (error) {
            console.error('Conversion failed:', error)
            alert('Conversion failed. Please try again.')
        } finally {
            setIsConverting(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="image">Select an image</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </div>
                    </div>
                    <CardFooter className="flex justify-between mt-4 px-0">
                        <Button type="submit" disabled={!file || isConverting}>
                            {isConverting ? 'Converting...' : 'Convert to WebP'}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
            {convertedImageUrl && convertedFilename && (
                <CardFooter className="flex flex-col items-start">
                    <a
                        href={convertedImageUrl}
                        download={convertedFilename}
                        className="text-blue-600 hover:underline"
                    >
                        Download Converted Image
                    </a>
                    <img src={convertedImageUrl} alt="Converted WebP" className="mt-4 max-w-full h-auto" />
                </CardFooter>
            )}
        </Card>
    )
}