from fastapi import APIRouter, HTTPException, Request, Response, status
from fpdf import FPDF

pdf_router = APIRouter()




@pdf_router.get("/pdf_demo", status_code=status.HTTP_200_OK)
async def pdf_demo(request: Request):

    try:



        # Create a sample PDF file
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Helvetica", size=24)
        pdf.cell(text="hello world", align="CENTER")



        # Prepare the filename and headers
        filename = "hello_world.pdf"
        headers = {
            "Content-Disposition": f"attachment; filename={filename}"
        }


        # Return the file as a response
        return Response(content=bytes(pdf.output()), media_type="application/pdf", headers=headers)


    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)) from e
